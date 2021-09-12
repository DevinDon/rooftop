import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { clickToCloseModalArgs, darkModalArgs, lightModalArgs } from './args';
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
DarkModal.args = darkModalArgs;

export const LightModal = Template.bind({});
LightModal.args = lightModalArgs;

const ClickToCloseTemplate: Story<ModalProps> = args => {
  const [isVisible, setIsVisible] = useState(true);

  return <div>
    <p>Something here</p>
    <Modal {...args} isVisible={isVisible} onClick={() => setIsVisible(false)} />
  </div>
};

export const ClickToCloseModal = ClickToCloseTemplate.bind({});
ClickToCloseModal.args = clickToCloseModalArgs;
