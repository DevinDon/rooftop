import { Transition } from '@headlessui/react';
import { Fragment, HTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind-styled-components';

export const StyledModal = tw.div`
  flex flex-col justify-end items-center
  fixed top-0 left-0
  w-screen h-screen
  overflow-hidden
  bg-gray-900

  md:justify-center
`;

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  dark?: boolean;
  isVisible?: boolean;
};

export const Modal = ({ children, dark, isVisible, ...rest }: ModalProps) =>
  <Transition
    as={Fragment}
    show={isVisible}
    enter="transition-opacity ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <StyledModal className={dark ? 'bg-opacity-50' : 'bg-opacity-0'} {...rest}>{children}</StyledModal>
  </Transition>;
