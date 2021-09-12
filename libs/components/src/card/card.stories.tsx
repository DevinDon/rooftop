import { Meta, Story } from '@storybook/react';
import { cardArgsWithLink, cardArgsWithoutLink, CardContainerContent } from './args';
import { Card, CardProps } from './card';

export default {
  component: Card.Container,
  title: 'Card',
} as Meta;

const Template: Story<CardProps['Container']> = args =>
  <Card.Container {...args} children={CardContainerContent} />;

export const CardWithLink = Template.bind({});
CardWithLink.args = cardArgsWithLink;

export const CardWithoutLink = Template.bind({});
CardWithoutLink.args = cardArgsWithoutLink;
