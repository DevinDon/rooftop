import { Card, CardProps } from './card';

export const ARGS_WITH_LINK: CardProps['Container'] = { link: { url: 'https://blog.don.red/', inNewTab: true } };

export const ARGS_WITHOUT_LINK: CardProps['Container'] = { link: undefined };

const cardTitleContent = '卡片';

const cardDescriptionContent = '卡片描述在这里';

const cardBodyContent = <p>这里是内容这里是内容这里是内容这里是内容这里这里是内容这里是内容这里是内容这里<br />是内容这里是内容这里是内容</p>;

const cardFooterContent = <span>版权所有 夜寒苏 <sup>©</sup> 2021+</span >;

export const CardContainerContent = <>
  <Card.Title>{cardTitleContent}</Card.Title>
  <Card.Description>{cardDescriptionContent}</Card.Description>
  <Card.Body>{cardBodyContent}</Card.Body>
  <Card.Footer>{cardFooterContent}</Card.Footer>
</>;
