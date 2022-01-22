import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const StyledFooter = styled.div`
  font-family: 'VT323', monospace;
  font-variant-ligatures: none;
`;

const TailwindFooter = tw(StyledFooter)`
  flex flex-row justify-center items-center
  sticky bottom-0
  h-8 w-full
  text-gray-600
`;

export type ArgsOfFooterComponent = {};

export const FooterComponent = (args: ArgsOfFooterComponent) => {

  return <TailwindFooter>
    Copyright © 2022+ Surfboard @IInfinity
  </TailwindFooter>;

};
