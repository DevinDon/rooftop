import { PrismaClient, Role } from '@prisma/client/generated/movie-api';
import { Random } from 'mockjs';
import { time, timeEnd } from 'console';

export const database = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
});

const randomArray = <R>(generate: () => R, length: number = Math.trunc(1 + Math.random() * 9)) => Array.from({ length }, () => generate());

const seedAphorisms = async () => database.aphorism.createMany({
  data: Array.from({ length: 10000 }, () => ({ content: Random.csentence(4, 30), published: true })),
});

const seedMovies = async () => Promise.all(randomArray(
  () => database.movie.create({
    data: {
      releasedAt: new Date(Random.datetime()),
      title: Random.ctitle(),
      aliases: randomArray(() => Random.ctitle()),
      rates: {
        create: randomArray(() => ({
          name: Random.ctitle(),
          rate: Random.float(1, 5),
          source: Random.url(),
        })),
      },
      areas: randomArray(() => Random.county()),
      crews: {
        create: randomArray(() => ({
          roles: Random.pick(Object.values(Role)),
          realName: Random.name(),
          playName: Random.cname(),
          chineseName: Random.cname(),
          person: {
            create: {
              realName: Random.name(),
              chineseName: Random.cname(),
              country: Random.county(),
              birth: new Date(Random.datetime()),
              sex: Random.pick([ '男', '女' ]),
            },
          },
        })),
      },
      covers: {
        create: {
          name: Random.ctitle(),
          description: Random.cparagraph(),
          link: Random.url(),
        },
      },
      sources: {
        create: {
          name: Random.ctitle(),
          description: Random.cparagraph(),
          link: Random.url(),
        },
      },
    },
  }),
  100,
));

(async () => {
  time('seed');
  await seedAphorisms();
  // await seedMovies();
  timeEnd('seed');
})();
