import { DEFAULT_DEV_CONFIG, ResterConfig } from '@rester/core';
import { Level, LevelMap } from '@rester/logger';

const config: ResterConfig = {
  ...DEFAULT_DEV_CONFIG,
  addresses: [
    {
      protocol: 'http', // process.env.RESTER_PROTOCOL
      host: 'localhost', // process.env.RESTER_HOST
      port: 8080, // process.env.RESTER_PORT
    },
  ],
  databases: [
    {
      type: 'mongodb', // only support mongodb now
      host: 'localhost', // process.env.RESTER_DB_HOST
      port: 27017, // process.env.RESTER_DB_PORT
      database: 'rester-dev', // process.env.RESTER_DB_NAME
      username: 'rester-dev', // process.env.RESTER_DB_USER
      password: 'rester-dev', // process.env.RESTER_DB_PASS
      authSource: 'admin', // process.env.RESTER_DB_AUTH
      logger: Level.DEBUG,
      sync: true,
      entities: null,
    },
  ],
  handlerPool: {
    max: 10, // process.env.RESTER_HANDLER_POOL_MAX
  },
  logger: {
    level: LevelMap.DEBUG, // process.env.RESTER_LOGGER_LEVEL
    trace: true, // process.env.RESTER_LOGGER_TRACE
    logout: 'temp/out.log', // process.env.RESTER_LOGGER_LOGOUT
    logerr: 'temp/err.log', // process.env.RESTER_LOGGER_LOGERR
  },
};

export const environment = {
  production: false,
  config,
};
