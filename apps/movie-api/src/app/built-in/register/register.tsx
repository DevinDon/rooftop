import { Capturer, existFile, Http400Exception, Schema, useRequestContentType, useStringRequestBody, type Handler, type Rester, type Router } from '@rester/core';
import { ensureDir, remove, writeFile } from '@rester/filesystem';
import { createHash } from 'crypto';
import { join, resolve } from 'path';
import type { ImportModule } from '../../helpers';

export const HANDLERS_PATH = resolve('temp', 'handlers');

export const routerOfRegister: Router = {
  location: {
    method: 'PUT',
    path: '/register',
  },
  initial: async () => ensureDir(HANDLERS_PATH),
  destroy: async () => remove(HANDLERS_PATH),
  handler: () => <Capturer><Register /></Capturer>,
};

export default routerOfRegister;

export const Register: Handler = async (_, { useContext, instance }) => {
  const { contentType } = useRequestContentType(useContext);
  if (contentType !== 'application/ecmascript') {
    throw new Http400Exception('"Content-Type" must be "application/ecmascript"');
  }
  const { body } = await useStringRequestBody(useContext);
  const md5 = createHash('md5').update(body).digest('base64url');
  const path = join(HANDLERS_PATH, `${md5}.mjs`);
  await existFile(path) || await writeFile(path, body);
  const router: Router = await import(path).then((importModule: ImportModule) => importModule.default);
  return <Schema>{(instance as Rester).route(router)}</Schema>;
};
