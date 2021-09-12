import { Meta, Story } from '@storybook/react';
import { AppContainer, AppContainerProps } from './app-container';
import { ARGS_WITH_CONTENT, ARGS_WITHOUT_CONTENT } from './args';

export default {
  component: AppContainer,
  title: 'AppContainer',
} as Meta;

const Template: Story<AppContainerProps> = args => <AppContainer {...args} />;

export const AppContainerWithoutContent = Template.bind({});
AppContainerWithoutContent.args = ARGS_WITHOUT_CONTENT;

export const AppContainerWithContent = Template.bind({});
AppContainerWithContent.args = ARGS_WITH_CONTENT;
