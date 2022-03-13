import type { Tree } from '@nrwl/devkit';
import { logger } from '@nrwl/devkit';
import { $ } from 'zx4';
import { generatePrismaClients } from '../prisma';

export type ResterSchema = {
  action: string;
  app: string;
};

export default async (tree: Tree, { action, app }: ResterSchema) => {
  switch (action) {
    case 'g':
    case 'generate':
      await $`nx generate @rester/nx:application --name=${app}`;
      await generatePrismaClients(tree, [ app ]);
      break;

    default:
      logger.info(`NX Avaliable commands: \n- ${[ 'generate, alias "g"' ].join('\n- ')}`);
      break;
  }
};
