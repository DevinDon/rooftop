import type { ResterListeningOptions, ResterServerOptions } from '@rester/core';
import { Level } from '@rester/logger';

const serverOptions: ResterServerOptions = {
  logger: {
    level: Level.info,
    // 如果不需要输出到终端，可以禁用
    // stdout: void 0,
    // stderr: void 0,
    // 支持直接传入可写流作为参数，比如 FS、S3、OSS 等
    logout: 'logs/out.log',
    logerr: 'logs/err.log',
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
