import { Meta, Story } from '@storybook/react';
import { ARGS_WITH_LINK, ARGS_WITHOUT_LINK, CardContainerContent } from './args';
import { Card, CardProps } from './card';

export default {
  component: Card.Container,
  title: 'Card',
} as Meta;

const Template: Story<CardProps['Container']> = args =>
  <Card.Container {...args} children={CardContainerContent} />;

export const CardWithLink = Template.bind({});
CardWithLink.args = ARGS_WITH_LINK;

export const CardWithoutLink = Template.bind({});
CardWithoutLink.args = ARGS_WITHOUT_LINK;
