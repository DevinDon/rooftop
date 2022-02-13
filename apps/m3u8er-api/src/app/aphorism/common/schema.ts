import { Type } from '@sinclair/typebox';

export const aphorismSchema = Type.Object({
  id: Type.Integer({ minimum: 0 }),
  createdAt: Type.Any(),
  updatedAt: Type.Any(),
  content: Type.String({ minLength: 1, maxLength: 32 }),
  published: Type.Boolean(),
});

export const aphorismsSchema = Type.Array(aphorismSchema);
