import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './app/access';
import { AccessHandler } from './app/common/handlers';
import { SurfModule } from './app/surf';
import { environment } from './environments/environment';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, SurfModule],
  ...environment.config,
});

rester.bootstrap();
