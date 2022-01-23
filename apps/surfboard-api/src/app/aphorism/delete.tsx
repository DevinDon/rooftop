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

export const AphorismDeleteHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={aphorismSchema}>
      <AphorismDelete {...validate(url)} />
    </SchemaHandler>;
  };

const AphorismDelete: Handler<{ id: number; }> =
  async ({ id }) => {
    const result = await database.aphorism
      .delete({ where: { id } })
      .catch(() => null);
    if (result === null) {
      throw new Http404Exception(`Aphorism "#${id}" not found`);
    }
    return result;
  };

export const aphorismDeleteRouter: Router = {
  location: {
    method: 'DELETE',
    path: '/aphorisms/:id',
  },
  handler: () => <ExceptionHandler>
    <AphorismDeleteHandler />
  </ExceptionHandler>,
};

export default aphorismDeleteRouter;
