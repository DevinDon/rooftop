import { Route } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { AboutComponent } from './about/about';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { HomeComponent } from './home/home';

const TailwindApp = tw.div`
  flex flex-col
  min-h-screen
`;

const TailwindBody = tw.div`
  flex flex-col flex-grow
  px-4
`;

export const App = () => {

  return <TailwindApp>

    <HeaderComponent>Surfboard</HeaderComponent>

    <TailwindBody>
      <Route path="/" exact component={() => <HomeComponent />} />
      <Route path="/about" component={() => <AboutComponent />} />
      {/* <Route path="/surf/:path" exact component={() => <SurfComponent />} /> */}
    </TailwindBody>

    <FooterComponent />

  </TailwindApp>;

};
