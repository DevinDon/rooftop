import { logger, Tree } from '@nrwl/devkit';
import { $ } from 'zx';
import { generatePrismaClients, postgres } from '../prisma';

export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export type PostintallSchema = {
  buildTools?: boolean;
};

export default async (tree: Tree, { buildTools }: PostintallSchema) => {
  buildTools && await $`nx workspace-generator build --build-tools-only=true`;
  await postgres();
  logger.info('NX Watting for postgres server to be ready...');
  await sleep(5000);
  await generatePrismaClients(tree);
  logger.info('NX Postinstall complete, please restart your VSCode for the changes to take effect.');
};
