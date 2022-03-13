import { Capturer, existFile, Http400Exception, Methods, Schema, useJsonRequestBody, useRequestContentType, useStringRequestBody, type Handler, type Rester, type Router } from '@rester/core';
import { writeFile } from '@rester/filesystem';
import { Type } from '@sinclair/typebox';
import { createHash } from 'crypto';
import { join } from 'path';
import type { ImportModule } from '../../helpers';
import { HANDLERS_PATH } from '../register/register';

export const routerOfUnregister: Router = {
  location: {
    method: 'DELETE',
    path: '/unregister',
  },
  handler: () => <Capturer><Unregister /></Capturer>,
};

export default routerOfUnregister;

export const requestSchema = Type.Object({
  location: Type.Object({
    method: Type.Enum(Methods),
    path: Type.String({ minLength: 1, maxLength: 1024 }),
  }),
});

export const Unregister: Handler = async (_, { useContext, instance }) => {
  const { contentType } = useRequestContentType(useContext);
  const rester = instance as Rester;
  if (contentType === 'application/ecmascript') {
    const { body } = await useStringRequestBody(useContext);
    const md5 = createHash('md5').update(body).digest('base64url');
    const path = join(HANDLERS_PATH, `${md5}.mjs`);
    await existFile(path) || await writeFile(path, body);
    const router: Router = await import(path).then((importModule: ImportModule) => importModule.default);
    return <Schema>{rester.unroute(router)}</Schema>;
  }
  if (contentType === 'application/json') {
    const { body: { location } } = await useJsonRequestBody(useContext, requestSchema);
    return <Schema>{rester.unroute({ location })}</Schema>;
  }
  throw new Http400Exception('"Content-Type" must be "application/ecmascript" or "application/json"');
};
