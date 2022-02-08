import { Story, Meta } from '@storybook/react';
import { TransitionRouter } from './transition-router';

export default {
  component: TransitionRouter,
  title: 'TransitionRouter',
} as Meta;

const Template: Story = (args) => <TransitionRouter {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
