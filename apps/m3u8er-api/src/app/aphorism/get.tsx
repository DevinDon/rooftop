import { Capturer, Http400Exception, Http404Exception, NumberValidator, Schema, useUrl, type Handler, type Router, type Url } from '@rester/core';
import { database } from '../helpers';
import { aphorismSchema } from './common';

export const routerOfGetAphorism: Router = {
  location: {
    method: 'GET',
    path: '/aphorisms/:id',
  },
  handler: () => <Capturer>
    <GetAphorism />
  </Capturer>,
};

export default routerOfGetAphorism;

const validate = (url: Url) => {
  const id = new NumberValidator(url.variables.id);
  if (!id.isExisted() || id.isInvalid() || !id.isInteger() || !id.isLargerThan(0)) {
    throw new Http400Exception('Aphorism "id" must be an integer > 0');
  }
  return { id: id.value };
};

export const GetAphorism: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <Schema schema={aphorismSchema}>
      <Process {...validate(url)} />
    </Schema>;
  };

export const Process: Handler<{ id: number; }> =
  async ({ id }) => {
    const aphorism = await database.aphorism.findUnique({ where: { id } });
    if (!aphorism) {
      throw new Http404Exception(`Aphorism "#${id}" not found`);
    }
    return aphorism;
  };
