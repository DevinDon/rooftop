import { ResterModule } from '@rester/core';
import { AphorismEntity } from './aphorism.entity';
import { AphorismView } from './aphorism.view';

export const AphorismModule: ResterModule = {
  entities: [AphorismEntity],
  views: [AphorismView],
};
