import type { Url } from '@rester/core';
import { Capturer, Http400Exception, NumberValidator, Schema, useUrl, type Handler, type Router } from '@rester/core';
import { Type } from '@sinclair/typebox';
import { database, Random } from '../../helpers';

export const routerOfSeed: Router = {
  location: {
    method: 'POST',
    path: '/seed',
  },
  handler: () => <Capturer><Seed /></Capturer>,
};

export default routerOfSeed;

const responseSchema = Type.Object({
  count: Type.Number({ minimum: 0 }),
});

const validate = (url: Url) => {
  const count = new NumberValidator(url.query.count ?? 1);
  if (count.isInvalid() || !count.isInteger() || !count.isLargerThan(0)) {
    throw new Http400Exception('Seed "count" must be an integer > 0');
  }
  return { count: count.value };
};

export const Seed: Handler = async (_, { useContext }) => {
  const { url } = useUrl(useContext);
  return <Schema schema={responseSchema}>
    <Process {...validate(url)} />
  </Schema>;
};

export const Process: Handler<{ count: number }> = async ({ count }, { logger }) => {
  const result = await database.aphorism.createMany({
    data: Array.from({ length: count }, () => ({
      content: Random.csentence(4, 30),
      published: true,
    })),
  });
  logger.debug(`Generated ${count} aphorisms`);
  return result;
};
