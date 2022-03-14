import { FilmIcon } from '@heroicons/react/outline';
import { Link, Route, Switch } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { AboutPage } from './about';
import HomePage from './home';
import PlayPage from './play';

const TailwindApp = tw.div`
`;

const TailwindNav = tw.div`
  sticky top-0
  shadow bg-white
  flex flex-row
  px-4 py-2 gap-2
`;

const TailwindNavLink = tw(Link)`
  border-none rounded
  px-4 py-2
  hover:bg-gray-200
  transition-colors duration-300
`;

const TailwindFlexGrow = tw.div`
  flex-grow
`;

const TailwindBody = tw.div`
  flex flex-col
  px-4 py-2
`;

export const App = () => <TailwindApp>

  <TailwindNav>
    <TailwindNavLink to='/'>
      <FilmIcon className='h-6 w-6' />
    </TailwindNavLink>
    <TailwindNavLink to='/'>Home</TailwindNavLink>
    <TailwindFlexGrow />
    <TailwindNavLink to='/about'>About</TailwindNavLink>
  </TailwindNav>

  <TailwindBody>
    <Switch>
      <Route path='/' exact render={() => <HomePage />} />
      <Route path='/play/:id' render={() => <PlayPage />} />
      <Route path='/about' exact render={() => <AboutPage title='movie' />} />
    </Switch>
  </TailwindBody>

</TailwindApp>;

export default App;
