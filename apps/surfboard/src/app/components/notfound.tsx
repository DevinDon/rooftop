import { useLocation } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const TailwindNotFound = tw.div`
  flex flex-col
`;

export type ArgsOfNotFoundComponent = {};

export const NotFoundComponent = (args: ArgsOfNotFoundComponent) => {

  const location = useLocation();

  return <TailwindNotFound>{`Unknown Path: ${location.pathname}`}</TailwindNotFound>;

};
