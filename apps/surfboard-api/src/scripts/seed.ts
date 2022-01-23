import { PrismaClient } from '@prisma/client/generated/surfboard-api';
import { Random } from 'mockjs';
import { time, timeEnd } from 'console';

export const database = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'info' },
    { emit: 'stdout', level: 'warn' },
  ],
});

const seedAphorisms = async () => database.aphorism.createMany({
  data: Array.from({ length: 10000 }, () => ({ content: Random.csentence(4, 30), published: true })),
});

(async () => {
  time('seed');
  await seedAphorisms();
  timeEnd('seed');
})();
