import tw from 'tailwind-styled-components';
import { Route, Link } from 'react-router-dom';

const TailwindApp = tw.div`
  // Your style here
`;

export const App = () => {

  return <TailwindApp>

    <div role="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page-2">Page 2</Link>
        </li>
      </ul>
    </div>
    <Route
      path="/"
      exact
      render={() => (
        <div>
          This is the generated root route.{' '}
          <Link to="/page-2">Click here for page 2.</Link>
        </div>
      )}
    />
    <Route
      path="/page-2"
      exact
      render={() => (
        <div>
          <Link to="/">Click here to go back to root page.</Link>
        </div>
      )}
    />

  </TailwindApp>;

};
