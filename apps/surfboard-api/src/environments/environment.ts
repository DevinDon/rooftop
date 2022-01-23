import type { PrismaClientOptions } from '@prisma/client/generated/surfboard-api/runtime';
import type { ResterListeningOptions, ResterServerOptions } from '@rester/core';
import { Level } from '@rester/logger';

const serverOptions: ResterServerOptions = {
  logger: {
    level: Level.debug,
  },
};

const listeningOptions: ResterListeningOptions = {
  host: 'localhost',
  port: 8080,
};

const prismaClientOptions: PrismaClientOptions = {
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
};

export const environment = {
  production: false,
  serverOptions,
  listeningOptions,
  prismaClientOptions,
};
