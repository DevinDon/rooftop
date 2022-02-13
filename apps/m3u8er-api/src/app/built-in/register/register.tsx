import { Capturer, existDirectory, existFile, Http400Exception, Schema, useRequestContentType, useStringRequestBody, type Handler, type Rester, type Router } from '@rester/core';
import { createHash } from 'crypto';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

export const HANDLERS_PATH = resolve('.', 'handlers');

export const routerOfRegister: Router = {
  location: {
    method: 'PUT',
    path: '/register',
  },
  initial: async () => await existDirectory(HANDLERS_PATH) || await mkdir(HANDLERS_PATH),
  destroy: async () => await existDirectory(HANDLERS_PATH) && await rm(HANDLERS_PATH, { recursive: true }),
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
  const router: Router = await import(path).then(mod => mod.default);
  return <Schema>{(instance as Rester).route(router)}</Schema>;
};
