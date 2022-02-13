import { Schema, type Handler, type Router } from '@rester/core';

export const routerOfPing: Router = {
  location: {
    method: 'GET',
    path: '/ping',
  },
  handler: () => <Ping />,
};

export default routerOfPing;

export const Ping: Handler = async () => <Schema mime='text/plain'>pong</Schema>;
