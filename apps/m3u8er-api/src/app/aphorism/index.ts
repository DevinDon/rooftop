import { routerOfDeleteAphorism } from './delete';
import { routerOfGetAphorism } from './get';
import { routerOfGetAphorisms } from './gets';
import { routerOfPatchAphorism } from './patch';
import { routerOfPostAphorism } from './post';
import { routerOfPutAphorism } from './put';

export const aphorismRouters = [
  routerOfDeleteAphorism,
  routerOfGetAphorism,
  routerOfPutAphorism,
  routerOfPostAphorism,
  routerOfGetAphorisms,
  routerOfPatchAphorism,
];
