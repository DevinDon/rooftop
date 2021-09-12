import type { ModalProps } from './modal';

export const darkModalArgs: ModalProps = {
  isVisible: true,
  dark: true,
};

export const lightModalArgs: ModalProps = {
  isVisible: true,
};

export const clickToCloseModalArgs: ModalProps = {
  dark: true,
  children: <div
    className="w-32 h-16 bg-white"
    onClickCapture={e => e.stopPropagation()}
  >
    Click other to close
  </div>,
};
