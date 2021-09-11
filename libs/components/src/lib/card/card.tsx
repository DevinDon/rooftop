import { HTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import '../../style';

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

export type CardComponentProps = HTMLAttributes<HTMLDivElement> & {
  /** 卡片标题，已自带标题样式 */
  title: ReactNode;
  /** 卡片描述*/
  desc: ReactNode;
  /** 卡片内容 */
  children: ReactNode;
  /** 卡片底部标注 */
  footer: ReactNode;
  /** 如果不为空，那么卡片可以点击跳转到指定链接 */
  link?: {
    url: string;
    inNewTab?: boolean;
  };
}

export const CardComponent = ({
  title,
  desc,
  children,
  footer,
  link,
  ...rest
}: CardComponentProps) => {

  const content = <StyledCard {...rest}>
    <StyledCardTitle>{title}</StyledCardTitle>
    <StyledCardDescription>{desc}</StyledCardDescription>
    <StyledCardBody>{children}</StyledCardBody>
    <StyledCardFooter>{footer}</StyledCardFooter>
  </StyledCard>;

  return link
    ? <a href={link.url} target={link.inNewTab ? '_blank' : '_self'} rel="noopener noreferrer">
      {content}
    </a>
    : content;

};

export default CardComponent;
