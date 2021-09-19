import { ArrowRightIcon } from '@heroicons/react/outline';
import { AppContainer } from '@iinfinity/components/app-container';
import { useCallback, useState } from 'react';
import tw from 'tailwind-styled-components';
import { HeadingComponent } from '@iinfinity/components/heading';
import styled from 'styled-components';

const Footer = tw.div`

`;

const Container = tw.div`
  flex flex-col justify-center items-center flex-grow
  p-4
`;

const StyledLogoFont = styled.div`
  font-family: 'VT323', monospace;
`;

const Logo = tw(StyledLogoFont)`
  text-6xl font-bold
`;

const Input = tw.input`
  flex-grow
  rounded-l-full py-4 px-6
  text-gray-700 leading-tight
  focus:outline-none
`;

const Search = () => {

  const [link, setLink] = useState('');

  const surf = useCallback(() => {
    if (!link) { return; }
    const encoded = btoa(encodeURI(link))
      .replace(/\//g, '_')
      .replace(/\+/g, '-');
    window.location.href = `/surf/${encoded}`;
  }, [link]);

  return <div className="max-w-2xl w-full box-border my-6 bg-white flex flex-row justify-between items-center rounded-full shadow hover:shadow-xl focus:shadow-xl transition transform">
    <Input
      id="search"
      type="text"
      placeholder="输入链接进行访问"
      onInput={e => setLink(e.currentTarget.value)}
      onKeyDown={({ key }) => key.toLowerCase() === 'enter' && surf()}
    />
    <div className="p-2 flex-shrink">
      <button onClick={surf} className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center">
        <ArrowRightIcon />
      </button>
    </div>
  </div>;

};

export const App = () => <AppContainer>
  <HeadingComponent title="冲浪板" subtitle="Surfboard" />
  <Container>
    <Logo>Surfboard</Logo>
    <Search />
  </Container>
  <Footer>Footer and Copyright</Footer>
</AppContainer>;

export default App;
