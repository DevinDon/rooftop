import {
  BooleanValidator,
  ExceptionHandler,
  Handler,
  Http400Exception,
  NumberValidator,
  Router,
  SchemaHandler,
  Url,
  useUrl,
} from '@rester/core';
import { database } from '../helpers';
import { aphorismsSchema } from './common';

const validate = (url: Url) => {
  const count = new NumberValidator(url.query.count || 10);
  const random = new BooleanValidator(url.query.random || false);
  if (count.isInvalid() || !count.isInteger() || !count.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "count" must be an integer > 0');
  }
  return { count: count.value, random: random.value };
};

export const AphorismsGetHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={aphorismsSchema}>
      <AphorismsGet {...validate(url)} />
    </SchemaHandler>;
  };

const AphorismsGet: Handler<{ count: number; random: boolean; }> =
  async ({ count, random }, { logger }) => {
    logger.debug(`Fetching ${count} aphorisms by ${random ? 'random' : 'ordered'}`);
    if (random) {
      return database.$queryRaw`SELECT * FROM "Aphorism" order by random() limit ${count}`;
    }
    return database.aphorism.findMany({ take: count });
  };

export const aphorismsGetRouter: Router = {
  location: {
    method: 'GET',
    path: '/aphorisms',
  },
  handler: () => <ExceptionHandler>
    <AphorismsGetHandler />
  </ExceptionHandler>,
};

export default aphorismsGetRouter;
