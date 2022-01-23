import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { decodeSafeBase64 } from '../utils';

const TailwindSurf = tw.iframe`
  flex flex-grow
`;

export type ArgsOfSurfComponent = {};

export const SurfComponent = (args: ArgsOfSurfComponent) => {

  const { path } = useParams<{ path: string; }>();
  const url = decodeSafeBase64(path);

  return <TailwindSurf
    title={`Surfboard: ${url}`}
    src={`${window.location.origin}/api/surf/${path}`}
  />;

};
