import { Link, Route } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { NxWelcome } from './nx-welcome';

const StyledApp = tw.div`
`;

export const App = () => <StyledApp>
  <Route
    path="/"
    exact
    render={() => <NxWelcome title='rooftop' />}
  />
  <Route
    path="/sub"
    exact
    render={() => (
      <div>
        <Link to="/">Click here to go back to root page.</Link>
      </div>
    )}
  />
</StyledApp>;
