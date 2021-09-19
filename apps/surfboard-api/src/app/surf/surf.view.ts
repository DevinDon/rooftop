import {
  BaseView,
  GET,
  PathQuery,
  PathVariable,
  requiredParams,
  ResourceResponse,
  ResterResponse,
  View,
} from '@rester/core';
import { getEntity } from '@rester/orm';
import { createHash } from 'crypto';
import { createReadStream, existsSync, ReadStream } from 'fs';
import { mkdir, readdir, writeFile } from 'fs/promises';
import { Browser, launch } from 'puppeteer';
import { SurfEntity } from './surf.entity';

// create, remove, modify, take, search
// one, more

const encode = (url: string) =>
  Buffer.from(encodeURI(url), 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const decode = (encoded: string) =>
  decodeURI(
    Buffer.from(
      encoded.replace(/-/g, '+').replace(/_/g, '/'),
      'base64',
    ).toString('utf-8'),
  );

@View('surfs')
export class SurfView extends BaseView {

  private entity: SurfEntity;
  private browser: Browser;
  /** Map<hash.ext, path> */
  private cache: Map<string, string>;

  async init() {
    this.entity = getEntity(SurfEntity);
    this.browser = await launch({ headless: true, args: ['--no-sandbox'] });
    this.cache = new Map();
    if (!existsSync('temp/surfs')) {
      await mkdir('temp/surfs', { recursive: true });
    }
    const list = await readdir('temp/surfs');
    for (const item of list) {
      this.cache.set(item, 'temp/surfs/' + item);
    }
    this.logger.debug('cache total:', this.cache.size);
  }

  async save(encoded: string, ext: '.html' | '.png', content: string | Buffer) {
    const hashext = createHash('sha1').update(encoded).digest('hex') + ext;
    const path = `temp/surfs/${hashext}`;
    await writeFile(path, content);
    this.cache.set(hashext, path);
    this.logger.debug('cache total:', this.cache.size);
    return path;
  }

  async load(
    encoded: string,
    ext: '.html' | '.png',
  ): Promise<ReadStream | null> {
    const hashext = createHash('sha1').update(encoded).digest('hex') + ext;
    if (this.cache.has(hashext)) {
      const path = this.cache.get(hashext);
      return createReadStream(path);
    }
    return null;
  }

  @GET('encode')
  async encode(@PathQuery('url') url: string) {
    requiredParams({ url });
    return encode(url);
  }

  @GET('image/:encoded')
  async fetchImage(@PathVariable('encoded') encoded: string) {
    const ext = '.png';
    const cache = await this.load(encoded, ext);
    if (cache) {
      return new ResourceResponse({
        file: cache,
        type: 'image/png',
      });
    }
    const url = decode(encoded);
    const page = await this.browser.newPage();
    const image = await page
      .goto(url, { waitUntil: 'networkidle0' })
      .then(response => response.buffer());
    this.save(encoded, ext, image);
    return new ResterResponse({
      data: image,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  @GET(':encoded')
  async take(
    /** base64 encoded url */
    @PathVariable('encoded') encoded: string,
    @PathQuery('type') type: 'text/html' | 'image/png' = 'text/html',
  ) {
    const ext = type === 'text/html' ? '.html' : '.png';
    const cache = await this.load(encoded, ext);
    if (cache) {
      return new ResourceResponse({
        file: cache,
        type,
      });
    }
    const url = decode(encoded);
    const page = await this.browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.querySelectorAll('img').forEach(element => {
        element.src = `/surfs/image/${btoa(encodeURI(element.src))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')}`;
      });
      document.querySelectorAll('a').forEach(element => {
        element.href = `/surfs/${btoa(encodeURI(element.href))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')}?type=text/html`;
      });
      document.querySelectorAll('script').forEach(element => {
        element.remove();
      });
    });
    const html = await page.content();
    const image = (await page.screenshot({ fullPage: true })) as Buffer;
    await page.close();
    this.save(encoded, '.html', html);
    this.save(encoded, '.png', image);
    return new ResterResponse({
      data: type === 'text/html' ? html : image,
      headers: {
        'Content-Type': type,
      },
    });
  }

}
