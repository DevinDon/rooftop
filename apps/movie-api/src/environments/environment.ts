import type { PrismaClient } from '@prisma/client/generated/movie-api';
import type { ResterListeningOptions, ResterServerOptions } from '@rester/core';
import { Level } from '@rester/logger';

const serverOptions: ResterServerOptions = {
  logger: {
    level: Level.all,
  },
};

const listeningOptions: ResterListeningOptions = {
  host: 'localhost',
  port: 8080,
};

const prismaClientOptions: ConstructorParameters<typeof PrismaClient>[0] = {
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
