import { PrismaClient } from '@prisma/client/generated/movie-api';
import { environment } from '../../environments/environment';

export type { Aphorism } from '@prisma/client/generated/movie-api';
export { PrismaClient } from '@prisma/client/generated/movie-api';

export const database = new PrismaClient(environment.prismaClientOptions);
