import { ExceptionHandler, Handler, Http400Exception, NumberValidator, Router, SchemaHandler, Url, useUrl } from '@rester/core';
import { Type } from '@sinclair/typebox';
import { database, Random } from '../../helpers';

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

export const SeedHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={responseSchema}>
      <Seed {...validate(url)} />
    </SchemaHandler>;
  };

export const Seed: Handler<{ count: number; }> =
  async ({ count }, { logger }) => {
    const result = await database.aphorism.createMany({
      data: Array.from({ length: count }, () => ({
        content: Random.csentence(4, 30),
        published: true,
      })),
    });
    logger.debug(`Generated ${count} aphorisms`);
    return result;
  };

export const seedRouter: Router = {
  location: {
    method: 'POST',
    path: '/seed',
  },
  handler: () => <ExceptionHandler>
    <SeedHandler />
  </ExceptionHandler>,
};

export default seedRouter;
