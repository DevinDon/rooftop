import { Capturer, Http500Exception, Schema, useJsonRequestBody, type Handler, type Router } from '@rester/core';
import { Logger } from '@rester/logger';
import { Type } from '@sinclair/typebox';
import { createHash } from 'crypto';
import EventEmitter from 'events';
import { createWriteStream } from 'fs';
import fse, { ensureDir, pathExists } from 'fs-extra';
import { writeFile } from 'fs/promises';
import { Parser } from 'm3u8-parser';
import { dirname, join, resolve } from 'path';
import { Browser, chromium, Page } from 'playwright';
import { $ } from 'zx';

export const routerOfPutTask: Router = {
  location: {
    method: 'PUT',
    path: '/tasks',
  },
  handler: () => <Capturer>
    <PutTask />
  </Capturer>,
};

export default routerOfPutTask;

const CACHED = { browser: null as unknown as Browser };

const getBrowser = () => {
  if (CACHED.browser) {
    return CACHED.browser;
  }
  return chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
};

export const PutTask: Handler =
  async (_, { useContext }) => {

    const { body } = await useJsonRequestBody(useContext, Type.Object({ url: Type.String({ format: 'uri' }), concat: Type.Optional(Type.Boolean()) }));

    return <Schema>
      <Process {...body} />
    </Schema>;
  };

export const Process: Handler<{ url: string; concat?: boolean; }> =
  async ({ url, concat }, { logger }) => {

    const browser = await getBrowser();
    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto(url).catch(() => { });

    const m3u8url = await new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Http500Exception('wait for m3u8 timeout')), 5000);
      page.route('**', route => {
        const url = route.request().url();
        if (new URL(url).pathname.endsWith('m3u8')) {
          logger.info(url);
          clearTimeout(timer);
          resolve(url);
        }
        logger.debug(url);
        route.continue();
      });
    });

    const response = await page.request.get(m3u8url, { ignoreHTTPSErrors: true });
    const content = (await response.body()).toString();

    const parser = new Parser();
    parser.push(content);
    parser.end();
    const uris = parser.manifest.segments
      .map(segment => segment.uri)
      .map(uri => uri.startsWith('http') ? uri : new URL(uri, m3u8url).href);

    logger.info(`total ${uris.length} segments`);
    const { listPath, m3u8Path, metadata } = await new Downloader({ uris, page, query: new URL(m3u8url).search, logger, m3u8: content }).start();
    logger.info(`list file: ${listPath}\nm3u8 file: ${m3u8Path}`);

    await page.close();
    await context.close();

    if (concat) {
      await $`ffmpeg -safe 0 -f concat -i ${listPath} -vcodec copy -acodec copy -bsf:a aac_adtstoasc ${dirname(listPath)}/output.mp4`;
    }

    return { listPath, m3u8Path, metadata };

  };

type ParamsOfDownloader = {
  uris: string[];
  page: Page;
  parallel?: number;
  query?: string;
  logger: Logger;
  m3u8: string;
};

class Downloader {

  private storagePath = '/mnt/storage/video';

  private uris: string[];
  private page: Page;
  private logger: Logger;
  private m3u8: string;

  private remaining: string[];
  private workers: EventEmitter[];
  private md5: string;
  private dir: string;
  private ended = new EventEmitter();

  constructor({ uris, page, logger, m3u8, parallel = 10, query = '' }: ParamsOfDownloader) {
    this.uris = uris.map(uri => uri + query);
    this.page = page;
    this.logger = logger;
    this.m3u8 = m3u8;
    this.md5 = createHash('md5').update(m3u8).digest('hex');
    this.dir = resolve(this.storagePath, this.md5);
    this.remaining = [...uris];
    this.workers = Array.from({ length: parallel }, () => new EventEmitter());
    this.logger.info(`Download dir: ${this.dir}, resources: ${this.uris.length}`);
    for (const worker of this.workers) {
      worker.on('idle', () => {
        if (this.remaining.length) {
          const uri = this.remaining.shift();
          worker.emit('download', uri);
        } else {
          parallel -= 1;
        }
        if (parallel === 0) {
          this.ended.emit('end');
        }
      });
      worker.on('download', async uri => {
        this.logger.info(`Downloading::: ${uri}`);
        await this.download(uri);
        worker.emit('idle');
      });
    }
  }

  private getFilename(uri: string) {
    return new URL(uri).pathname.split('/').pop()!;
  }

  private async download(uri: string) {
    const path = resolve(this.dir, this.getFilename(uri));
    if (await pathExists(path)) {
      this.logger.info(`${path} exists, skipped`);
      return;
    }
    const response = await this.page.request.get(uri, { ignoreHTTPSErrors: true });
    createWriteStream(path).end(await response.body());
  }

  async start() {
    await ensureDir(this.dir);
    for (const worker of this.workers) {
      worker.emit('idle');
    }
    await new Promise(resolve => this.ended.on('end', resolve));
    const list = this.uris
      .map(uri => resolve(this.dir, this.getFilename(uri)))
      .map(path => `file '${path}'`)
      .join('\n');
    const listPath = resolve(this.dir, 'index.list');
    const m3u8 = this.uris.reduce((content, uri) => content.replace(uri, this.getFilename(uri)), this.m3u8);
    const m3u8Path = resolve(this.dir, 'index.m3u8');
    const metadata = { title: await this.page.title(), url: resolve(this.md5, 'index.m3u8') };
    const metadataPath = join(this.md5, 'metadata.json');
    await Promise.all([
      writeFile(listPath, list),
      writeFile(m3u8Path, m3u8),
      fse.writeJson(metadataPath, metadata),
    ]);
    return { listPath, m3u8Path, metadata };
  }

}
