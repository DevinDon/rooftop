import { Meta, Story } from '@storybook/react';
import { cardWithLinkArgs, cardWithoutLinkArgs } from './args';
import { CardComponent, CardComponentProps } from './card';

export default {
  component: CardComponent,
  title: 'CardComponent',
} as Meta;

const Template: Story<CardComponentProps> = args => <CardComponent {...args} />;

export const CardWithoutLink = Template.bind({});
CardWithoutLink.args = cardWithoutLinkArgs;

export const CardWithLink = Template.bind({});
CardWithLink.args = cardWithLinkArgs;
