import { aphorismDeleteRouter } from './delete';
import { aphorismGetRouter } from './get';
import { aphorismsGetRouter } from './gets';
import { aphorismPatchRouter } from './patch';
import { aphorismPostRouter } from './post';
import { aphorismPutRouter } from './put';

export const aphorismRouters = [
  aphorismDeleteRouter,
  aphorismGetRouter,
  aphorismPutRouter,
  aphorismPostRouter,
  aphorismsGetRouter,
  aphorismPatchRouter,
];
