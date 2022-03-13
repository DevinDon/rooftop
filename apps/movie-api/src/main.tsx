import { loadenv, Rester } from '@rester/core';
import { aphorismRouters } from './app/aphorism';
import { builtInRouters } from './app/built-in';
import { movieRouters } from './app/movie';
import { environment } from './environments/environment';

loadenv({
  importMetaUrl: import.meta.url,
  environment,
});

export const bootstrap = async () => {

  const server = new Rester(environment.serverOptions);

  await Promise.all([
    // built-in routers
    server.routes(builtInRouters),
    // aphorism routers
    server.routes(aphorismRouters),
    // movie routes
    server.routes(movieRouters),
  ]);

  server.listen(environment.listeningOptions);

};

bootstrap();
