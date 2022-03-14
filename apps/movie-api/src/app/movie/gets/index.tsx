import { Capturer, Cors, Schema, type Handler, type Router } from '@rester/core';
import { ensureDir, isFile, loadJson, readdir as readDir } from '@rester/filesystem';
import { resolve } from 'path';
import { Downloader } from '../put/download';

export type Metadata = {
  source: string;
  title: string;
  m3u8: string;
  md5: string;
};

export const routerOfGetMovieList: Router = {
  location: {
    method: 'GET',
    path: '/movies',
  },
  initial: () => ensureDir(Downloader.STORAGE_PATH),
  handler: () => <Capturer>
    <Cors>
      <GetMovieList />
    </Cors>
  </Capturer>,
};

export default routerOfGetMovieList;

export const GetMovieList: Handler = async () => {

  const dirs = await readDir(Downloader.STORAGE_PATH);
  const list = await Promise.all(
    dirs
      .map(dirname => resolve(Downloader.STORAGE_PATH, dirname, 'metadata.json'))
      .map(async path => await isFile(path) ? loadJson<Metadata>(path).catch(() => null) : null),
  );
  const movies = list.filter(Boolean) as Metadata[];

  return <Schema>
    {movies}
  </Schema>;

};
