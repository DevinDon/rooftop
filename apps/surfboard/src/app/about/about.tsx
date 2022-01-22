import tw from 'tailwind-styled-components';

const TailwindAbout = tw.div`
`;

export type ArgsOfAboutComponent = {};

export const AboutComponent = (args: ArgsOfAboutComponent) => {

  return <TailwindAbout>Hello, AboutComponent!</TailwindAbout>;

};
