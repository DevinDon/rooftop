import { getProjects, logger, Tree } from '@nrwl/devkit';
import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { $ } from 'zx';

export const DATABASE = {
  name: 'rester-postgres',
  username: 'rester-postgres',
  password: 'rester-postgres',
  database: 'rester-postgres',
  volume: 'rester-postgres',
  schema: 'public',
  host: '127.0.0.1',
  port: 5432,
} as const;

export const createEnv = async (dir: string, project: string = DATABASE.database) => {
  const envPath = join(dir, '.env');
  if (!existsSync(envPath)) {
    const envFile = `DATABASE_URL="postgresql://${DATABASE.username}:${DATABASE.password}@${DATABASE.host}:${DATABASE.port}/${project}?schema=${DATABASE.schema}"`;
    await writeFile(envPath, envFile);
    logger.info(`Env file created at "${envPath}", content:\n${envFile}`);
  }
};

export const postgres = () => $`docker rm -f ${DATABASE.name} \
  && docker run \
    --name ${DATABASE.name} \
    -e POSTGRES_USER=${DATABASE.username} \
    -e POSTGRES_PASSWORD=${DATABASE.password} \
    -e POSTGRES_DB=${DATABASE.database} \
    -v ${DATABASE.volume}:/var/lib/postgresql/data \
    -p ${DATABASE.host}:${DATABASE.port}:${DATABASE.port} \
    -d postgres:14`;

export const docs = (dir: string) => $`cd ${dir} \
  && prisma generate \
  && prisma-docs-generator serve`;

export const pull = (dir: string) => $`cd ${dir} \
  && prisma db pull`;

export const push = (dir: string) => $`cd ${dir} \
  && prisma db push`;

export const reset = (dir: string) => $`cd ${dir} \
  && prisma migrate reset --skip-seed --skip-generate --force \
  && prisma db push`;

export const seed = (dir: string) => $`cd ${dir} \
  && prisma db seed`;

export const studio = (dir: string) => $`cd ${dir} \
  && prisma studio`;

const getPath = (tree: Tree, projectName?: string) => {
  if (!projectName) {
    throw new Error('Project name shoule be defined');
  }
  const projects = getProjects(tree);
  const project = projects.get(projectName);
  if (!project) {
    throw new Error(`Project ${projectName} not found`);
  }
  return project.root;
};

/**
 * If project name is null or undefined, will generate prisma client with all projects.
 *
 * @param projectName project that you want to generated prisma client
 */
export const generatePrismaClients = async (tree: Tree, projectNames?: string[]) => {
  const allProjects = getProjects(tree);
  const projects = projectNames
    ? projectNames
      .map(project => allProjects.get(project)!)
      .filter(Boolean)
    : Object.values(Object.fromEntries(getProjects(tree)));
  const filteredProjects = projects
    .filter(project => project.projectType === 'application')
    .map(
      project => {
        const paths = project.root.split('/');
        return {
          // bug? 新项目中无法使用 at 方法，只能做降级处理
          // 新项目和本项目中使用 tsc --showConfig 获取到的 tsconfig 完全一致
          name: paths[paths.length - 1],
          dir: project.root,
        };
      },
    )
    .filter(
      project => existsSync(join(project.dir, 'prisma/schema.prisma')),
    );
  logger.info(
    projects.length
      ? `NX Prisma Client will be generated for these projects:\n\n- ${filteredProjects.map(project => project.name).join('\n- ')}`
      : 'No valid projects, check "<project-dir>/prisma/schema.prisma" is exist or not',
  );
  for (const { name, dir } of filteredProjects) {
    logger.info(`NX Load env and apply prisma from project "${name}" with dir "${dir}"`);
    await createEnv(dir, name);
    await reset(dir);
    await push(dir);
    await seed(dir);
  }
};

export type PrismaSchema = {
  command: string;
  project?: string;
};

export default async (tree: Tree, { command, project }: PrismaSchema) => {
  const path = getPath(tree, project);
  switch (command) {
    case 'create-env':
      await createEnv(path, project);
      break;
    case 'postgres':
      await postgres();
      break;
    case 'docs':
      await docs(path);
      break;
    case 'pull':
      await pull(path);
      break;
    case 'push':
      await push(path);
      break;
    case 'reset':
      await reset(path);
      break;
    case 'seed':
      await seed(path);
      break;
    case 'studio':
      await studio(path);
      break;
    default:
      logger.info('Usage: nx workspace-generator prisma [command] [app]');
      command && logger.warn(`No such command: "${command}"`);
      command && logger.log(`Avaliable commands:\n- ${['create-env', 'postgres', 'docs', 'pull', 'push', 'seed', 'studio'].join('\n- ')}`);
      break;
  }
};
