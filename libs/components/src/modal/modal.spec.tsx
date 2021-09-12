import { render } from '@testing-library/react';
import { ARGS_WITH_CONTENT, ARGS_WITH_DARK_BG, ARGS_WITH_LIGHT_BG } from './args';
import { Modal } from './modal';

describe('Modal', () => {

  it('should render dark modal', () => {
    const { baseElement: component } = render(<Modal {...ARGS_WITH_DARK_BG} />);
    expect(component).toBeTruthy();
  });

  it('should render light modal', () => {
    const { baseElement: component } = render(<Modal {...ARGS_WITH_LIGHT_BG} />);
    expect(component).toBeTruthy();
  });

  it('should render something inner', () => {
    const { baseElement: component } = render(<Modal {...ARGS_WITH_CONTENT} isVisible={true} />);
    expect(component).toBeTruthy();
    const content = component.querySelector('div.w-32.h-16.bg-white') as HTMLDivElement;
    expect(content).toBeTruthy();
  });

});
