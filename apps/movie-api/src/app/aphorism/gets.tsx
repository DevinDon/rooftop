import { BooleanValidator, Capturer, Http400Exception, NumberValidator, Schema, useUrl, type Handler, type Router, type Url } from '@rester/core';
import { database } from '../helpers';
import { aphorismsSchema } from './common';

export const routerOfGetAphorisms: Router = {
  location: {
    method: 'GET',
    path: '/aphorisms',
  },
  handler: () => <Capturer>
    <GetAphorisms />
  </Capturer>,
};

export default routerOfGetAphorisms;

const validate = (url: Url) => {
  const count = new NumberValidator(url.query.count || 10);
  const random = new BooleanValidator(url.query.random || false);
  if (count.isInvalid() || !count.isInteger() || !count.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "count" must be an integer > 0');
  }
  return { count: count.value, random: random.value };
};

export const GetAphorisms: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <Schema schema={aphorismsSchema}>
      <Process {...validate(url)} />
    </Schema>;
  };

export const Process: Handler<{ count: number; random: boolean }> =
  async ({ count, random }, { logger }) => {
    logger.debug(`Fetching ${count} aphorisms by ${random ? 'random' : 'ordered'}`);
    if (random) {
      return database.$queryRaw`SELECT * FROM "Aphorism" order by random() limit ${count}`;
    }
    return database.aphorism.findMany({ take: count });
  };
