import { ExceptionHandler, Handler, Prettify, Router, SchemaHandler, useJsonRequestBody } from '@rester/core';
import { Static, Type } from '@sinclair/typebox';
import { database } from '../helpers';
import { aphorismSchema } from './common';

const requestSchema = Type.Object({
  content: Type.String({ minLength: 1, maxLength: 32 }),
  published: Type.Optional(Type.Boolean()),
});

type AphorismPostRequestSchema = Prettify<Static<typeof requestSchema>>;

export const AphorismPostHandler: Handler =
  async (_, { useContext }) => {
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    return <SchemaHandler schema={aphorismSchema} statusCode={201}>
      <AphorismPost {...body} />
    </SchemaHandler>;
  };

const AphorismPost: Handler<AphorismPostRequestSchema> =
  async ({ content, published = false }) =>
    database.aphorism.create({
      data: { content, published },
    });

export const aphorismPostRouter: Router = {
  location: {
    method: 'POST',
    path: '/aphorisms',
  },
  handler: () => <ExceptionHandler>
    <AphorismPostHandler />
  </ExceptionHandler>,
};

export default aphorismPostRouter;
