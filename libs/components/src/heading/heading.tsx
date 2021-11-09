import tw from 'tailwind-styled-components';
import boxIcon from './box.icon.svg';
import githubIcon from './github.icon.svg';

export interface Props {
  title: string;
  subtitle?: string;
}

const StyledIconLink = tw.a`
  self-center
  rounded-full
  flex-shrink-0
  transition transform
  hover:scale-110 hover:shadow
`;

const StyledHeading = tw.div`
  flex flex-row justify-between items-end space-x-3
  w-full p-4
  shadow
`;

const StyledTitle = tw.h1`
  font-bold text-2xl
  flex-shrink-0
  my-0
  truncate
`;

const StyledSubtitle = tw.h2`
  text-base text-yellow-500
  flex-shrink
  my-0
  truncate
`;

export const HeadingComponent = ({ title, subtitle }: Props) => <StyledHeading>
  <StyledIconLink
    className="h-8 w-8"
    href="/"
    title="返回主页"
    rel="noopener noreferrer"
  >
    <img src={boxIcon} alt="Tool Icon" />
  </StyledIconLink>
  <StyledTitle>{title}</StyledTitle>
  <StyledSubtitle>{subtitle}</StyledSubtitle>
  <div className="flex-grow" />
  <StyledIconLink
    className="h-6 w-6"
    href="https://github.com/devindon"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={githubIcon} alt="GitHub Icon" />
  </StyledIconLink>
</StyledHeading>;
