import type { ResterListeningOptions, ResterServerOptions } from '@rester/core';
import { Level } from '@rester/logger';

const serverOptions: ResterServerOptions = {
  logger: {
    level: Level.info,
    stdout: undefined,
    stderr: undefined,
  },
};

const listeningOptions: ResterListeningOptions = {
  host: 'localhost',
  port: 8080,
};

export const environment = {
  production: true,
  serverOptions,
  listeningOptions,
  prismaClientOptions: void 0,
};
