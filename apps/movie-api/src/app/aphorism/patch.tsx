import { Capturer, Http400Exception, Http404Exception, NumberValidator, pureUndefined, Schema, useJsonRequestBody, useUrl, type Handler, type Prettify, type Router, type Url } from '@rester/core';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { database } from '../helpers';
import { aphorismSchema } from './common';

export const routerOfPatchAphorism: Router = {
  location: {
    method: 'PATCH',
    path: '/aphorisms/:id',
  },
  handler: () => <Capturer>
    <PatchAphorism />
  </Capturer>,
};

export default routerOfPatchAphorism;

const requestSchema = Type.Object({
  content: Type.Optional(Type.String({ minLength: 1, maxLength: 32 })),
  published: Type.Optional(Type.Boolean()),
});

type RequestSchema = Prettify<Static<typeof requestSchema>>;

const validate = (url: Url) => {
  const id = new NumberValidator(url.variables.id);
  if (!id.isExisted() || id.isInvalid() || !id.isInteger() || !id.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "id" must be an integer > 0');
  }
  return { id: id.value };
};

export const PatchAphorism: Handler =
  async (_, { useContext }) => {
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    const { url } = useUrl(useContext);
    return <Schema schema={aphorismSchema}>
      <Process {...body} {...validate(url)} />
    </Schema>;
  };

export const Process: Handler<RequestSchema & { id: number }> =
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
