import {
  ExceptionHandler,
  Handler,
  Http400Exception,
  Http404Exception,
  NumberValidator,
  Router,
  SchemaHandler,
  Url,
  useUrl,
} from '@rester/core';
import { database } from '../helpers';
import { aphorismSchema } from './common';

const validate = (url: Url) => {
  const id = new NumberValidator(url.variables.id);
  if (!id.isExisted() || id.isInvalid() || !id.isInteger() || !id.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "id" must be an integer > 0');
  }
  return { id: id.value };
};

export const AphorismGetHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={aphorismSchema}>
      <AphorismGet {...validate(url)} />
    </SchemaHandler>;
  };

const AphorismGet: Handler<{ id: number; }> =
  async ({ id }) => {
    const aphorism = await database.aphorism.findUnique({ where: { id } });
    if (!aphorism) {
      throw new Http404Exception(`Aphorism "#${id}" not found`);
    }
    return aphorism;
  };

export const aphorismGetRouter: Router = {
  location: {
    method: 'GET',
    path: '/aphorisms/:id',
  },
  handler: () => <ExceptionHandler>
    <AphorismGetHandler />
  </ExceptionHandler>,
};

export default aphorismGetRouter;
