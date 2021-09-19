import tw from 'tailwind-styled-components';

const StyledCopyright = tw.div`
  flex flex-col justify-center items-center
  p-4
  text-sm
`;

export const CopyrightComponent = () => <StyledCopyright>
  <p>版权所有 <strong>夜寒苏</strong> <sup>©</sup> 2021+</p>
</StyledCopyright>;
