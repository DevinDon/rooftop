import type { AppContainerProps } from './app-container';

export const ARGS_WITHOUT_CONTENT: AppContainerProps = {};

export const ARGS_WITH_CONTENT: AppContainerProps = {
  children: <p>Hello, world!</p>,
};
