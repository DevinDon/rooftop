import { Transition } from '@headlessui/react';
import { Route } from 'react-router-dom';
import { AboutComponent } from './about/about';
// import { NotFoundComponent } from './components/notfound';
import { HomeComponent } from './home/home';
import { SurfComponent } from './surf/surf';

export const routes = [
  { path: '/', exact: true, component: HomeComponent },
  { path: '/about', exact: true, component: AboutComponent },
  { path: '/surf/:id', exact: true, component: SurfComponent },
  // { path: '*', exact: true, component: NotFoundComponent },
];

export const AppRouter = () => {

  return <>
    {
      routes.map(
        route => <Route key={route.path} path={route.path} exact={route.exact}>
          {
            ({ match }) => <Transition
              show={!!match}
              className='absolute w-full h-full flex'
              appear={true}
              enter='transition-all ease-in-out duration-500 delay-150'
              enterFrom='opacity-0 scale-110'
              enterTo='opacity-100 scale-100'
              leave='transition-all ease-in-out duration-500 delay-150'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-90'
            >
              <route.component />
            </Transition>
          }
        </Route>,
      )
    }
    {/* <Route component={NotFoundComponent} />; */}
  </>;

};
