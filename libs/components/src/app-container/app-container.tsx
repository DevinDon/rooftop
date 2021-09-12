import { HTMLAttributes } from 'react';
import tw from 'tailwind-styled-components';

export type AppContainerProps = HTMLAttributes<HTMLDivElement>;

const StyledAppContainer = tw.div`
  flex flex-col
  min-h-screen
`;

export const AppContainer = ({ children, ...rest }: AppContainerProps) =>
  <StyledAppContainer {...rest}>{children}</StyledAppContainer>;
