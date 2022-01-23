import {
  ExceptionHandler,
  Handler,
  Http400Exception,
  Http404Exception,
  NumberValidator,
  Prettify,
  pureUndefined,
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
  content: Type.Optional(Type.String({ minLength: 1, maxLength: 32 })),
  published: Type.Optional(Type.Boolean()),
});

type AphorismPatchRequestSchema = Prettify<Static<typeof requestSchema>>;

const validate = (url: Url) => {
  const id = new NumberValidator(url.variables.id);
  if (!id.isExisted() || id.isInvalid() || !id.isInteger() || !id.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "id" must be an integer > 0');
  }
  return { id: id.value };
};

export const AphorismPatchHandler: Handler =
  async (_, { useContext }) => {
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={aphorismSchema}>
      <AphorismPatch {...body} {...validate(url)} />
    </SchemaHandler>;
  };

const AphorismPatch: Handler<AphorismPatchRequestSchema & { id: number; }> =
  async ({ id, content, published }) => {
    const data = pureUndefined({ content, published });
    const result = await database.aphorism
      .update({
        data,
        where: { id },
      })
      .catch(() => null);
    if (!result) {
      throw new Http404Exception(`Aphorism "#${id}" not found`);
    }
    return result;
  };

export const aphorismPatchRouter: Router = {
  location: {
    method: 'PATCH',
    path: '/aphorisms/:id',
  },
  handler: () => <ExceptionHandler>
    <AphorismPatchHandler />
  </ExceptionHandler>,
};

export default aphorismPatchRouter;
