import { ResterModule } from '@rester/core';
import { AccessEntity } from './access.entity';
import { AccessView } from './access.view';

export const AccessModule: ResterModule = {
  entities: [AccessEntity],
  views: [AccessView],
};
