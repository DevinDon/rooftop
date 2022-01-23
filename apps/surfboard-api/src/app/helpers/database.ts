import { PrismaClient } from '@prisma/client/generated/surfboard-api';
import { environment } from '../../environments/environment';

export type { Aphorism } from '@prisma/client/generated/surfboard-api';
export { PrismaClient } from '@prisma/client/generated/surfboard-api';

export const database = new PrismaClient(
  environment.prismaClientOptions as any,
);
