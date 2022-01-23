import {
  ExceptionHandler,
  Handler,
  Http400Exception,
  Http404Exception,
  NumberValidator,
  Prettify,
  Router,
  SchemaHandler,
  Url,
  useJsonRequestBody,
  useUrl,
} from '@rester/core';
import { Static, Type } from '@sinclair/typebox';
import { database } from '../helpers';
import { aphorismSchema } from './common';

const requestSchema = Type.Object({
  content: Type.String({ minLength: 1, maxLength: 32 }),
  published: Type.Boolean(),
});

type AphorismPutRequestSchema = Prettify<Static<typeof requestSchema>>;

const validate = (url: Url) => {
  const id = new NumberValidator(url.variables.id);
  if (!id.isExisted() || id.isInvalid() || !id.isInteger() || !id.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "id" must be an integer > 0');
  }
  return { id: id.value };
};

export const AphorismPutHandler: Handler =
  async (_, { useContext }) => {
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={aphorismSchema}>
      <AphorismPut {...body} {...validate(url)} />
    </SchemaHandler>;
  };

const AphorismPut: Handler<AphorismPutRequestSchema & { id: number; }> =
  async ({ id, content, published }) => {
    const result = await database.aphorism
      .update({
        data: { content, published },
        where: { id },
      })
      .catch(() => null);
    if (!result) {
      throw new Http404Exception(`Aphorism "#${id}" not found`);
    }
    return result;
  };

export const aphorismPutRouter: Router = {
  location: {
    method: 'PUT',
    path: '/aphorisms/:id',
  },
  handler: () => <ExceptionHandler>
    <AphorismPutHandler />
  </ExceptionHandler>,
};

export default aphorismPutRouter;
