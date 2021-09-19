import { ArrowRightIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const StyledContainer = tw.div`
  flex flex-row justify-between items-center
  max-w-2xl w-full
  rounded-full shadow box-border my-6 bg-white
  transition transform
  hover:shadow-xl focus:shadow-xl
`;

const StyledInput = tw.input`
  flex-grow
  rounded-l-full py-4 px-6
  text-gray-700 leading-tight
  focus:outline-none
`;

const StyledButton = tw.button`
  flex items-center justify-center
  text-white rounded-full
  w-10 h-10 p-2
  transition transform
  focus:outline-none
  ${props => props.disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 shadow'}
`;

const URL_REG = /^(http(s)?:\/\/)\w+[^\s]+(\.[^\s]+){1,}$/;

export const SearchComponent = () => {

  const [link, setLink] = useState('');
  const [valid, setValid] = useState(false);

  const surf = useCallback(() => {
    if (!link) { return; }
    const encoded = btoa(encodeURI(link))
      .replace(/\//g, '_')
      .replace(/\+/g, '-');
    window.location.href = `/surf/${encoded}`;
  }, [link]);

  useEffect(() => {
    setValid(URL_REG.test(link));
  }, [link]);

  return <StyledContainer>
    <StyledInput
      id="search"
      type="text"
      placeholder="输入链接进行访问"
      onInput={e => setLink(e.currentTarget.value.trim())}
      onKeyDown={({ key }) => key.toLowerCase() === 'enter' && surf()}
    />
    <div className="p-2 flex-shrink">
      <StyledButton disabled={!valid} onClick={surf}>
        <ArrowRightIcon />
      </StyledButton>
    </div>
  </StyledContainer>;

};

export default SearchComponent;
