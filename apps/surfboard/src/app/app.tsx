import { Transition } from '@headlessui/react';
import { TransitionRouter } from '@rooftop/components';
import tw from 'tailwind-styled-components';
import { AboutComponent } from './about/about';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { HomeComponent } from './home/home';
import { SurfComponent } from './surf/surf';

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
        <TransitionRouter routes={[
          { path: '/', exact: true, component: HomeComponent },
          { path: '/about', exact: true, component: AboutComponent },
          { path: '/surf/:id', exact: true, component: SurfComponent },
          // { path: '*', exact: true, component: NotFoundComponent },
        ]} />
      </TailwindBody>

      <FooterComponent />

    </TailwindApp>
  </Transition>;

};
