import { Transition } from '@headlessui/react';
import tw from 'tailwind-styled-components';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { AppRouter } from './router';

const TailwindApp = tw.div`
  flex flex-col
  min-h-screen
`;

const TailwindBody = tw.div`
  relative
  flex flex-col flex-grow
  mx-4
`;

export const App = () => {

  return <Transition
    appear={true}
    show={true}
    enter='transition-all ease-in-out duration-1000 delay-150'
    enterFrom='opacity-0 scale-110'
    enterTo='opacity-100 scale-100'
    leave='transition-all ease-in-out duration-1000 delay-150'
    leaveFrom='opacity-100 scale-100'
    leaveTo='opacity-0 scale-90'
  >
    <TailwindApp>

      <HeaderComponent />

      <TailwindBody>
        <AppRouter />
      </TailwindBody>

      <FooterComponent />

    </TailwindApp>
  </Transition>;

};
