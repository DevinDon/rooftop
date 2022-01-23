import { Rester } from '@rester/core';
import { aphorismRouters } from './app/aphorism';
import { pingRouter, seedRouter } from './app/built-in';
import { surfRouters } from './app/surf';
import { environment } from './environments/environment';

export const bootstrap = async () => {

  const server = new Rester(environment.serverOptions);

  await Promise.all([
    // built-in routers
    server.routes([
      pingRouter,
      seedRouter,
    ]),
    // aphorism routers
    server.routes(aphorismRouters),
    // surf routers
    server.routes(surfRouters),
  ]);

  server.listen(environment.listeningOptions);

};
