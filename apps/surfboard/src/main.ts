import { DEFAULT_HANDLERS, Rester } from '@rester/core';
import { AccessModule } from './app/access';
import { AphorismModule } from './app/aphorism';
import { AccessHandler } from './app/common/handlers';
import { environment } from './environments/environment';

const rester = new Rester({
  handlers: [AccessHandler, ...DEFAULT_HANDLERS],
  modules: [AccessModule, AphorismModule],
  ...environment.config,
});

rester.bootstrap();
