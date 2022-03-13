import { Capturer, Cors, Schema, Static, useUrl, type Handler, type Router } from '@rester/core';
import { join } from 'path';
import { Downloader } from '../put/download';

export const routerOfGetMovie: Router = {
  location: {
    method: 'GET',
    path: '/movies/*',
  },
  handler: () => <Capturer>
    <Cors>
      <GetMovie />
    </Cors>
  </Capturer>,
};

export default routerOfGetMovie;

export const GetMovie: Handler = async (_, { useContext }) => {

  const { url } = useUrl(useContext);
  const path = join(Downloader.STORAGE_PATH, url.slices.slice(1).join('/'));

  return <Schema>
    <Static path={path} />
  </Schema>;

};
