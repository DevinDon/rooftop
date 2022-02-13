import { Capturer, Schema, useJsonRequestBody, type Handler, type Prettify, type Router } from '@rester/core';
import { Static, Type } from '@sinclair/typebox';
import { database } from '../helpers';
import { aphorismSchema } from './common';

export const routerOfPostAphorism: Router = {
  location: {
    method: 'POST',
    path: '/aphorisms',
  },
  handler: () => <Capturer>
    <PostAphorism />
  </Capturer>,
};

export default routerOfPostAphorism;

const requestSchema = Type.Object({
  content: Type.String({ minLength: 1, maxLength: 32 }),
  published: Type.Optional(Type.Boolean()),
});

type RequestSchema = Prettify<Static<typeof requestSchema>>;

export const PostAphorism: Handler =
  async (_, { useContext }) => {
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    return <Schema schema={aphorismSchema} statusCode={201}>
      <Process {...body} />
    </Schema>;
  };

export const Process: Handler<RequestSchema> =
  async ({ content, published = false }) =>
    database.aphorism.create({
      data: { content, published },
    });
