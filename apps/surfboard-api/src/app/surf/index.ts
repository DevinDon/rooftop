import { ResterModule } from '@rester/core';
import { SurfEntity } from './surf.entity';
import { SurfView } from './surf.view';

export const SurfModule: ResterModule = {
  entities: [SurfEntity],
  views: [SurfView],
};
