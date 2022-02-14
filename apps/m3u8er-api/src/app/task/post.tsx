import { Capturer, Schema, useJsonRequestBody, type Handler, type Router } from '@rester/core';
import { Type } from '@sinclair/typebox';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { Browser, chromium } from 'playwright';
import { $ } from 'zx';

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

    const binaryPath = resolve('.', 'temp', `${await page.title()}.binary`);
    const savedPath = resolve('.', 'temp', `${await page.title()}.webm`);

    const binaryStream = createWriteStream(binaryPath);

    // 显示进度条
    await page.exposeFunction('setProgress', (percentage: number) => {
      logger.debug(`recording progress: ${(percentage * 100).toFixed(2).padStart(6, ' ')}%`);
    });
    // 将数据写入文件，避免内存溢出
    await page.exposeFunction('setData', (data: string) => {
      logger.debug(`writing data: ${(data.length / 1024).toFixed(2)}KB`);
      binaryStream.write(data, 'binary');
    });
    // 录制完毕
    await page.exposeFunction('setEnd', () => {
      logger.debug('recording end');
      binaryStream.end();
    });

    // 返回文件大小，单位 B
    const size = await page.evaluate<number>(
      async () => new Promise(resolve => {

        const setProgress = (window as any).setProgress;
        const setData = (window as any).setData;
        const setEnd = (window as any).setEnd;

        const ab2str = (ab: ArrayBuffer) => new Uint8Array(ab)
          .reduce((str, byte) => str + String.fromCharCode(byte), '');

        const element = document.getElementsByTagName('video')[0] as HTMLVideoMediaElement;

        const storage = {
          stream: null as unknown as MediaStream,
          recorder: null as unknown as MediaRecorder,
          timer: null as unknown as NodeJS.Timeout,
          size: 0,
        };

        // 使用 onplaying 时间，使 tracks 准备就绪后再开始录制
        element.onplaying = () => {
          // 重设 onplaying 事件，防止多次触发
          element.onplaying = null;
          storage.stream = element.captureStream(60);
          storage.recorder = new MediaRecorder(storage.stream, { mimeType: 'video/webm; codecs=vp9,opus' });
          storage.recorder.ondataavailable = async e => {
            if (e.data.size <= 0) { return; }
            setProgress(element.currentTime / element.duration);
            storage.size += e.data.size;
            setData(ab2str(await e.data.arrayBuffer()));
          };
          storage.recorder.onstop = async () => {
            clearInterval(storage.timer);
            setEnd();
            resolve(storage.size);
          };
          storage.recorder.start();
          storage.timer = setInterval(() => storage.recorder.requestData(), 1 * 1000);
          // test
          setTimeout(() => storage.recorder.stop(), 20 * 1000);
        };

        element.play();

      }),
    );
    const readableSize = `${(size / 1024 / 1024).toFixed(2)}MB`;
    logger.info(`video size::: ${readableSize}`);

    $.verbose = false;
    await $`ffmpeg -y -i ${binaryPath} -vcodec copy -acodec copy ${savedPath} && rm ${binaryPath}`;
    logger.info(`saved path::: ${savedPath}`);

    await page.close();
    await context.close();

    return [savedPath, readableSize];

  };
