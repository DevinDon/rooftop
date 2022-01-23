import { Handler, Router, SchemaHandler } from '@rester/core';

export const PingHandler: Handler =
  async () => <SchemaHandler mime="text/plain">pong</SchemaHandler>;

export const pingRoute: Router = {
  location: {
    method: 'GET',
    path: '/ping',
  },
  handler: PingHandler,
};

export default pingRoute;
