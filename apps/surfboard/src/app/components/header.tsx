import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const TailwindHeader = tw.div`
  flex flex-row justify-between items-center
  px-4 py-2 mb-2 space-x-4
  shadow
  sticky top-0
  z-auto
  bg-white
`;

const TailwindTitle = tw.h1`
  text-3xl font-bold text-gray-500
`;

const TailwindSplitter = tw.div`
  flex-grow
`;

const TailwindLink = tw(Link)`
  hover:underline hover:underline-offset-0
  transition-all
`;

export type ArgsOfNavbarComponent = {
  children: ReactNode;
};

export const HeaderComponent = ({ children }: ArgsOfNavbarComponent) => {

  return <TailwindHeader>
    <TailwindLink to="/"><TailwindTitle>{children}</TailwindTitle></TailwindLink>
    <TailwindSplitter />
    <TailwindLink to="/">首页</TailwindLink>
    <TailwindLink to="/about">关于</TailwindLink>
  </TailwindHeader>;

};
