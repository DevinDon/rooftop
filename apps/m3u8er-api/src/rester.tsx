import { Rester } from '@rester/core';
import { aphorismRouters } from './app/aphorism';
import { builtInRouters } from './app/built-in';
import { taskRouters } from './app/task';
import { environment } from './environments/environment';

export const bootstrap = async () => {

  const server = new Rester(environment.serverOptions);

  await Promise.all([
    // built-in routers
    server.routes(builtInRouters),
    // aphorism routers
    server.routes(aphorismRouters),
    // tasks routers
    server.routes(taskRouters),
  ]);

  server.listen(environment.listeningOptions);

};
