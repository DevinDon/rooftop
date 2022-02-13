import { PrismaClient } from '@prisma/client/generated/m3u8er-api';
import { environment } from '../../environments/environment';

export type { Aphorism } from '@prisma/client/generated/m3u8er-api';
export { PrismaClient } from '@prisma/client/generated/m3u8er-api';

export const database = new PrismaClient(
  environment.prismaClientOptions as any,
);
