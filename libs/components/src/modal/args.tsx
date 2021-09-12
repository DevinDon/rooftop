import type { ModalProps } from './modal';

export const ARGS_WITH_DARK_BG: ModalProps = {
  isVisible: true,
  dark: true,
};

export const ARGS_WITH_LIGHT_BG: ModalProps = {
  isVisible: true,
};

export const ARGS_WITH_CONTENT: ModalProps = {
  dark: true,
  children: <div
    className="w-32 h-16 bg-white"
    onClickCapture={e => e.stopPropagation()}
  >
    Click other to close
  </div>,
};
