import type { Router } from '@rester/core';

export * from './database';
export * from './mock';

export type ImportModule = { default: Router };
