import { Capturer, Schema, useJsonRequestBody, type Handler, type Router } from '@rester/core';
import { createReadStream, createWriteStream } from 'fs';
import { mConverter, mDownloader, mIndicator, mParser } from 'node-m3u8-to-mp4';
import { join, resolve } from 'path';
import fetch from 'node-fetch';
import { $ } from 'zx';
import { writeFile } from 'fs/promises';
import { chromium, Browser } from 'playwright';
import { Type } from '@sinclair/typebox';
import { STDNUL } from '@rester/logger';
import EventEmitter from 'events';

export const routerOfPostTask: Router = {
  location: {
    method: 'POST',
    path: '/tasks',
  },
  handler: () => <Capturer>
    <PostTask />
  </Capturer>,
};

export default routerOfPostTask;

const CACHED = { browser: null as unknown as Browser };

const getBrowser = () => {
  if (CACHED.browser) {
    return CACHED.browser;
  }
  return chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
};

type HTMLVideoMediaElement = HTMLVideoElement & { captureStream: (fps?: number) => MediaStream; };

export const PostTask: Handler =
  async (_, { useContext }) => {

    const { body } = await useJsonRequestBody(useContext, Type.Object({ url: Type.String({ format: 'uri' }) }));

    return <Schema>
      <Process {...body} />
    </Schema>;
  };

export const Process: Handler<{ url: string; }> =
  async ({ url }, { logger }) => {

    // // const url = 'https://www.nunuyy1.top/dianying/96920.html';
    // // const url = 'https://gk.lka.hu/old2/html5/';
    // const url = 'http://localhost:3000/src/content/capture/video-video/';
    // // const url = 'https://www.nunuyy1.top/dianying/96920.html';

    const browser = await getBrowser();
    const context = await browser.newContext();
    const page = await context.newPage();

    page.route('**', route => {
      logger.debug(route.request().url());
      route.continue();
    });

    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('video');

    const emitter = new EventEmitter();
    emitter.on('progress', (progress: number) => logger.debug(`recording progress: ${(progress * 100).toFixed(2).padStart(6, ' ')}%`));

    await page.exposeFunction('setProgress', (percentage: number) => emitter.emit('progress', percentage));

    const size = await page.evaluate<number>(
      async () => new Promise(resolve => {

        const setProgress = (window as any).setProgress;

        const element = document.getElementsByTagName('video')[0] as HTMLVideoMediaElement;

        const storage = {
          stream: null as unknown as MediaStream,
          recorder: null as unknown as MediaRecorder,
          chunks: [] as Blob[],
          start: null as unknown as number,
        };

        element.addEventListener('play', () => {
          storage.stream = element.captureStream();
          storage.recorder = new MediaRecorder(storage.stream, { mimeType: 'video/webm; codecs=vp9' });
          storage.recorder.ondataavailable = e => e.data.size > 0 && storage.chunks.push(e.data);
          storage.recorder.onstop = async () => {
            const blob = new Blob(storage.chunks, { type: 'video/webm; codecs=vp9' });
            const url = URL.createObjectURL(blob);
            const button = document.createElement('a');
            document.body.appendChild(button);
            button.id = 'download';
            button.innerText = 'Download Video';
            button.href = url;
            button.download = `${document.title}.webm`;
            resolve(blob.size / 1024 / 1024);
          };
          storage.recorder.start();
          storage.start = Date.now();
        });

        element.addEventListener('timeupdate', () => setProgress(element.currentTime / element.duration));

        element.play();

      }),
    );

    logger.info(`video size::: ${size} MB`);

    const [download] = await Promise.all([
      // It is important to call waitForEvent before click to set up waiting.
      page.waitForEvent('download'),
      // Triggers the download.
      page.locator('#download').click(),
    ]);
    // wait for download to complete
    const path = `temp/${download.suggestedFilename()}`;
    const rawPath = `temp/raw-${download.suggestedFilename()}`;
    await download.saveAs(rawPath);
    $.verbose = false;
    await $`ffmpeg -y -i ${rawPath} -vcodec copy -acodec copy ${path} && rm ${rawPath}`;

    logger.info(`saved path::: ${path}`);

    await page.close();
    await context.close();

    return [`${size} MB`, path];

  };
