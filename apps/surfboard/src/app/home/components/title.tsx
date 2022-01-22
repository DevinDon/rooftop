import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const StyledTitle = styled.h1`
  font-family: 'VT323', monospace;
`;

const TailwindTitle = tw(StyledTitle)`
  text-8xl font-bold text-gray-800
`;

export type ArgsOfTitleComponent = {
  children: ReactNode;
};

export const TitleComponent = ({ children }: ArgsOfTitleComponent) => {

  return <TailwindTitle>{children}</TailwindTitle>;

};
