import { Http500Exception, type Handler } from '@rester/core';
import { ensureDir, pathExists, writeJson } from '@rester/filesystem';
import type { Logger } from '@rester/logger';
import { createHash } from 'crypto';
import EventEmitter from 'events';
import { createWriteStream } from 'fs';
import { writeFile } from 'fs/promises';
import { Parser } from 'm3u8-parser';
import { dirname, relative, resolve } from 'path';
import type { Browser, Page } from 'playwright';
import { chromium } from 'playwright';
import { $ } from 'zx';
import type { Metadata } from '../gets';

const CACHED = { browser: null as unknown as Browser };

const getBrowser = () => {
  if (CACHED.browser) {
    return CACHED.browser;
  }
  return chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
};

export const Download: Handler<{ url: string; concat?: boolean }> = async ({ url, concat }, { logger }) => {

  const browser = await getBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.goto(url).catch(() => void 0);

  const m3u8url = await new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Http500Exception('wait for m3u8 timeout')), 5000);
    page.route('**', route => {
      const href: string = route.request().url();
      if (new URL(href).pathname.endsWith('m3u8')) {
        logger.info(href);
        clearTimeout(timer);
        resolve(href);
      }
      logger.debug(href);
      route.continue();
    });
  });

  const response = await page.request.get(m3u8url, { ignoreHTTPSErrors: true });
  const content: string = (await response.body()).toString();

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

export class Downloader {

  public static readonly STORAGE_PATH = './temp/movies';

  private rawUris: string[];

  private uris: string[];

  private page: Page;

  private logger: Logger;

  private m3u8: string;

  private remaining: string[];

  private workers: EventEmitter[];

  /** md5 of source m3u8 file content */
  private md5: string;

  private dir: string;

  private ended = new EventEmitter();

  constructor({ uris, page, logger, m3u8, parallel = 10, query = '' }: ParamsOfDownloader) {
    this.rawUris = uris;
    this.uris = uris.map(uri => uri + query);
    this.page = page;
    this.logger = logger;
    this.m3u8 = m3u8;
    this.md5 = createHash('md5').update(m3u8).digest('hex');
    this.dir = resolve(Downloader.STORAGE_PATH, this.md5);
    this.remaining = [ ...uris ];
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
      worker.on('download', async (uri: string) => {
        this.logger.info(`Downloading::: ${uri}`);
        await this.download(uri);
        worker.emit('idle');
      });
    }
  }

  private getFilename(uri: string) {
    return new URL(uri).pathname.split('/').pop() as string;
  }

  private async download(uri: string) {
    const path = resolve(this.dir, this.getFilename(uri));
    if (await pathExists(path)) {
      this.logger.info(`${path} exists, skipped`);
      return;
    }
    try {
      const response = await this.page.request.get(uri, { ignoreHTTPSErrors: true });
      createWriteStream(path).end(await response.body());
    } catch (error) {
      this.logger.error('error while downloading files:::', error);
    }
  }

  async start() {
    await ensureDir(this.dir);
    const listPath = resolve(this.dir, 'index.list');
    const list = this.uris
      .map(uri => relative(Downloader.STORAGE_PATH, resolve(this.dir, this.getFilename(uri))))
      .map(path => `file '${path}'`)
      .join('\n');
    const m3u8Path = resolve(this.dir, 'index.m3u8');
    const m3u8 = this.rawUris.reduce((content, uri) => content.replace(uri, this.getFilename(uri)), this.m3u8);
    const sourceHtmlPath = resolve(this.dir, 'source.html');
    const sourceHtml = await this.page.innerHTML('html');
    const sourceM3u8Path = resolve(this.dir, 'source.m3u8');
    const sourceM3u8 = this.m3u8;
    const metadataPath = resolve(this.dir, 'metadata.json');
    const metadata: Metadata = {
      source: this.page.url(),
      title: await this.page.title(),
      m3u8: 'index.m3u8',
      md5: this.md5,
    };
    await Promise.all([
      writeFile(listPath, list),
      writeFile(m3u8Path, m3u8),
      writeFile(sourceHtmlPath, sourceHtml),
      writeFile(sourceM3u8Path, sourceM3u8),
      writeJson(metadataPath, metadata),
    ]);
    for (const worker of this.workers) {
      worker.emit('idle');
    }
    await new Promise(resolve => this.ended.on('end', resolve));
    return {
      listPath: relative(Downloader.STORAGE_PATH, listPath),
      m3u8Path: relative(Downloader.STORAGE_PATH, m3u8Path),
      metadata,
    };
  }

}
