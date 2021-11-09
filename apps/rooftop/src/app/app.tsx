import { Card } from '@iinfinity/components/card';
import tw from 'tailwind-styled-components';

const StyledHeading = tw.h1`
  bg-black
`;

export const App = () => {

  return <>
    <div>
      <StyledHeading className="bg-black text-yellow bg-white bg-yellow">Hello, Rooftop!</StyledHeading>
    </div>

    <Card.Container link={{ url: 'https://blog.don.red', inNewTab: true }}>
      <Card.Title>卡片标题</Card.Title>
      <Card.Description>卡片内容</Card.Description>
      <Card.Body><p>这里是<strong>卡片内容</strong></p></Card.Body>
      <Card.Footer>版权所有 XXX <sup>©</sup> 2021</Card.Footer>
    </Card.Container>
  </>;

};

export default App;
