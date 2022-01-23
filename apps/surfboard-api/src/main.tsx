import { loadenv } from '@rester/core';
import { environment } from './environments/environment';
import { bootstrap } from './rester';

loadenv({
  importMetaUrl: import.meta.url,
  environment,
});

bootstrap();
