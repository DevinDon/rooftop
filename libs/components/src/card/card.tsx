import { HTMLAttributes } from 'react';
import tw from 'tailwind-styled-components';
import '../style';

const StyledCard = tw.div`
  flex flex-col
  max-w-sm
  box-border
  p-4
  shadow
  rounded-sm

  transition
  transform
  hover:shadow-lg
  hover:scale-105
`;

const StyledCardTitle = tw.h3`
  font-bold text-lg
`;

const StyledCardDescription = tw.p`
  text-sm text-yellow-500
  mt-2
`;

const StyledCardBody = tw.div`
  box-border my-4
`;

const StyledCardFooter = tw.div`
  w-full
  text-xs text-gray-500 text-center
`;

export interface CardProps {
  Container: HTMLAttributes<HTMLDivElement> & {
    /** 如果不为空，那么卡片可以点击跳转到指定链接 */
    link?: {
      url: string;
      inNewTab?: boolean;
    };
  },
  Title: HTMLAttributes<HTMLHeadingElement>,
  Description: HTMLAttributes<HTMLParagraphElement>,
  Body: HTMLAttributes<HTMLDivElement>,
  Footer: HTMLAttributes<HTMLDivElement>,
}

/**
 * 创建一个卡片组件。
 *
 * 范例：
 * ```tsx
 * <Card.Container link={{ url: 'https://blog.don.red', inNewTab: true }}>
 *   <Card.Title>卡片标题</Card.Title>
 *   <Card.Description>卡片内容</Card.Description>
 *   <Card.Body><p>这里是<strong>卡片内容</strong></p></Card.Body>
 *   <Card.Footer>版权所有 XXX <sup>©</sup> 2021</Card.Footer>
 * </Card.Container>
 * ```
 */
export const Card = {
  /** 卡片容器 */
  Container: ({ link, ...rest }: CardProps['Container']) => {
    const content = <StyledCard {...rest} />;
    return link
      ? <a
        children={content}
        href={link.url}
        target={link.inNewTab ? '_blank' : '_self'}
        rel="noopener noreferrer"
      />
      : content;
  },
  /** 卡片标题，已自带标题样式 */
  Title: (props: CardProps['Title']) => <StyledCardTitle {...props} />,
  /** 卡片描述 */
  Description: (props: CardProps['Description']) => <StyledCardDescription {...props} />,
  /** 卡片内容 */
  Body: (props: CardProps['Body']) => <StyledCardBody {...props} />,
  /** 卡片底部标注 */
  Footer: (props: CardProps['Footer']) => <StyledCardFooter {...props} />,
};
