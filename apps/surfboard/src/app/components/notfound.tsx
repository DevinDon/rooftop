import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const TailwindNotFound = tw.div`
  flex flex-col
`;

export type ArgsOfNotFoundComponent = {};

export const NotFoundComponent = (args: ArgsOfNotFoundComponent) => {

  const { 0: path } = useParams<{ 0: string; }>();

  return <TailwindNotFound>{`Unknown Path: ${path}`}</TailwindNotFound>;

};
