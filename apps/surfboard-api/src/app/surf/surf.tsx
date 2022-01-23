import {
  ExceptionHandler,
  Handler,
  Http400Exception,
  Http404Exception,
  NumberValidator,
  Router,
  SchemaHandler,
  StringValidator,
  Url,
  useUrl,
} from '@rester/core';
import { database } from '../helpers';
import { chromium, Browser } from 'playwright';
import { decodeSafeBase64, isUrl } from '../utils';

const CACHED = { browser: null as unknown as Browser };

const getBrowser = () => {
  if (CACHED.browser) {
    return CACHED.browser;
  }
  return chromium.launch({ headless: true });
};

const validate = (url: Url) => {
  const id = new StringValidator(url.variables.id);
  if (!id.isExisted()) {
    throw new Http400Exception('Surf "id" must be an existed string');
  }
  const parsed = decodeSafeBase64(id.value);
  if (!isUrl(parsed)) {
    throw new Http400Exception('Surf "id" must be a valid url');
  }
  return { url: parsed };
};

export const SurfHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler mime="text/html">
      <Surf {...validate(url)} />
    </SchemaHandler>;
  };

const Surf: Handler<{ url: string; }> =
  async ({ url }) => {
    const browser = await getBrowser();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => {

      document.querySelectorAll('img').forEach(element => {
        if (element.src.includes('data:image/')) {
          return;
        }
        element.src = `/surf/image/${btoa(encodeURI(element.src))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')}`;
      });

      document.querySelectorAll('a').forEach(element => {
        element.href = `/surf/${btoa(encodeURI(element.href))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')}`;
      });

    });
    const html = await page.content();
    await page.close();
    return html;
  };

export const surfRouter: Router = {
  location: {
    method: 'GET',
    path: '/surf/:id',
  },
  handler: () => <ExceptionHandler>
    <SurfHandler />
  </ExceptionHandler>,
};
