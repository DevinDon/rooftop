import { Link, Route } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import NxWelcome from './nx-welcome';

const TailwindApp = tw.div`
`;

const TailwindNav = tw.div`
  flex flex-row
  px-4 py-2 gap-2
`;

const TailwindNavLink = tw(Link)`
  border-none
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
    <TailwindNavLink to="/">Home</TailwindNavLink>
    <TailwindFlexGrow />
    <TailwindNavLink to="/about">About</TailwindNavLink>
  </TailwindNav>

  <TailwindBody>
    <Route path="/" exact render={() => <NxWelcome title="movie" />} />
    <Route path="/about" exact render={() => <div><Link to="/">Click here to go back to root page.</Link></div>} />
  </TailwindBody>

</TailwindApp>;

export default App;
