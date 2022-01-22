import tw from 'tailwind-styled-components';
import { NavigationBarComponent } from './components/navigation-bar';
import { TitleComponent } from './components/title';

const TailwindHome = tw.div`
  flex flex-col justify-center items-center flex-grow
`;

export type ArgsOfHomeComponent = {};

export const HomeComponent = (args: ArgsOfHomeComponent) => {

  return <TailwindHome>
    <TitleComponent>Surfboard</TitleComponent>
    <NavigationBarComponent />
  </TailwindHome>;

};
