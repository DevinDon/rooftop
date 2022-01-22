import { ArrowRightIcon, BanIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { encodeSafeBase64 } from '../../utils';

const TailwindContainer = tw.div`
  flex flex-row justify-between items-center
  max-w-2xl w-full
  rounded-full shadow box-border my-6 bg-white
  transition transform
  hover:shadow-xl focus:shadow-xl
`;

const StyledFontVF = styled.input`
  font-family: 'VT323', monospace;
  font-variant-ligatures: none;
`;

const TailwindInput = tw(StyledFontVF)`
  flex-grow
  rounded-l-full py-4 px-6
  text-gray-700 leading-tight
  focus:outline-none
  text-xl
`;

const TailwindButton = tw.button`
  flex items-center justify-center
  text-white rounded-full
  w-10 h-10 p-2
  transition transform
  focus:outline-none
  ${props => props.disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 shadow'}
`;

const URL_REG = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?)+(\.[a-z]{2,6}\/)?/;

export const NavigationBarComponent = () => {

  const [link, setLink] = useState('');
  const [invalid, setInvalid] = useState(true);

  const surf = useCallback(() => {
    if (invalid) { return; }
    const encoded = encodeSafeBase64(link);
    window.location.href = `/surf/${encoded}`;
  }, [link, invalid]);

  useEffect(() => {
    setInvalid(!URL_REG.test(link));
  }, [link]);

  return <TailwindContainer>
    <TailwindInput
      id="navigate"
      type="text"
      placeholder="Enter URL to surf"
      onInput={e => setLink(e.currentTarget.value)}
      value={link}
      onKeyDown={({ key }) => key.toLowerCase() === 'enter' && surf()}
    />
    <div className="p-2 flex-shrink">
      <TailwindButton disabled={invalid} onClick={surf}>
        {invalid ? <BanIcon /> : <ArrowRightIcon />}
      </TailwindButton>
    </div>
  </TailwindContainer>;

};
