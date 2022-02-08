import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { decodeSafeBase64 } from '../utils';

const TailwindSurf = tw.iframe`
  flex flex-grow
`;

export type ArgsOfSurfComponent = {};

export const SurfComponent = (args: ArgsOfSurfComponent) => {

  const { id } = useParams<{ id: string; }>();

  if (!id) {
    return <div>Not found id</div>;
  }

  const url = decodeSafeBase64(id);

  return <TailwindSurf
    title={`Surfboard: ${url}`}
    src={`${window.location.origin}/api/surf/${id}`}
  />;

};
