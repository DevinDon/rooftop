import { AppContainer } from '@iinfinity/components/app-container';
import { CopyrightComponent } from '@iinfinity/components/copyright';
import { HeadingComponent } from '@iinfinity/components/heading';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { SearchComponent } from './search';

const StyledContainer = tw.div`
  flex flex-col justify-center items-center flex-grow
  p-4
`;

const StyledLogoFont = styled.div`
  font-family: 'VT323', monospace;
`;

const StyledLogo = tw(StyledLogoFont)`
  text-6xl font-bold
`;

export const App = () => <AppContainer>
  <HeadingComponent title="冲浪板" subtitle="Surfboard" />
  <StyledContainer>
    <StyledLogo>Surfboard</StyledLogo>
    <SearchComponent />
  </StyledContainer>
  <CopyrightComponent />
</AppContainer>;

export default App;
