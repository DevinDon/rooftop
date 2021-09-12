import { Meta, Story } from '@storybook/react';
import { ARGS_WITH_CONTENT, ARGS_WITH_DARK_BG, ARGS_WITH_LIGHT_BG } from './args';
import { Modal, ModalProps } from './modal';

export default {
  component: Modal,
  title: 'Modal',
} as Meta;

const Template: Story<ModalProps> = args => <div>
  <p>Something here</p>
  <Modal {...args} />
</div>;

export const DarkModal = Template.bind({});
DarkModal.args = ARGS_WITH_DARK_BG;

export const LightModal = Template.bind({});
LightModal.args = ARGS_WITH_LIGHT_BG;

const ClickToCloseTemplate: Story<ModalProps> = args => <div>
  <p>Something here</p>
  <Modal {...args} />
</div>;

export const ClickToCloseModal = ClickToCloseTemplate.bind({});
ClickToCloseModal.args = ARGS_WITH_CONTENT;
