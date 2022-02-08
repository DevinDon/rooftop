import { Transition } from '@headlessui/react';
import { Route } from 'react-router-dom';

export type RouteConfig = {
  path?: string;
  exact?: boolean;
  component: (...args: any) => JSX.Element;
};

export type ArgsOfTransitionRouter = {
  routes: RouteConfig[];
};

export const TransitionRouter = ({ routes }: ArgsOfTransitionRouter) => <>
  {
    routes.map(
      ({ component: Component, ...route }) => <Route key={route.path} path={route.path} exact={route.exact}>
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
            <Component />
          </Transition>
        }
      </Route>,
    )
  }
</>;

export default TransitionRouter;
