import type { CardComponentProps } from './card';

export const cardWithoutLinkArgs: CardComponentProps = {
  title: '普通卡片',
  desc: '这是一个普通的卡片组件',
  children: <p>这里是内容这里是内容这里是内容这里是内容这里这里是内容这里是内容这里是内容这里<br />是内容这里是内容这里是内容</p>,
  footer: <span>版权所有 夜寒苏 <sup>©</sup> 2021+</span >,
};

export const cardWithLinkArgs: CardComponentProps = {
  title: '跳转卡片',
  desc: '这是一个可以点击跳转的卡片',
  children: <p>这里是内容这里是内容这里是内容这里是内容这里这里是内容这里是内容这里是内容这里<br />是内容这里是内容这里是内容</p>,
  footer: <span>版权所有 夜寒苏 <sup>©</sup> 2021+</span>,
  link: { url: 'https://blog.don.red/', inNewTab: true },
};
