import { Capturer, Http400Exception, Http404Exception, NumberValidator, Schema, useUrl, type Handler, type Router, type Url } from '@rester/core';
import { database } from '../helpers';
import { aphorismSchema } from './common';

export const routerOfDeleteAphorism: Router = {
  location: {
    method: 'DELETE',
    path: '/aphorisms/:id',
  },
  handler: () => <Capturer>
    <DeleteAphorism />
  </Capturer>,
};

export default routerOfDeleteAphorism;

const validate = (url: Url) => {
  const id = new NumberValidator(url.variables.id);
  if (!id.isExisted() || id.isInvalid() || !id.isInteger() || !id.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "id" must be an integer > 0');
  }
  return { id: id.value };
};

export const DeleteAphorism: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <Schema schema={aphorismSchema}>
      <Process {...validate(url)} />
    </Schema>;
  };

export const Process: Handler<{ id: number }> =
  async ({ id }) => {
    const result = await database.aphorism
      .delete({ where: { id } })
      .catch(() => null);
    if (result === null) {
      throw new Http404Exception(`Aphorism "#${id}" not found`);
    }
    return result;
  };
