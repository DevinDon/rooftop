import { render } from '@testing-library/react';
import { clickToCloseModalArgs, darkModalArgs, lightModalArgs } from './args';
import { Modal } from './modal';

describe('Modal', () => {

  it('should render dark modal', () => {
    const { baseElement: component } = render(<Modal {...darkModalArgs} />);
    expect(component).toBeTruthy();
  });

  it('should render light modal', () => {
    const { baseElement: component } = render(<Modal {...lightModalArgs} />);
    expect(component).toBeTruthy();
  });

  it('should render something inner', () => {
    const { baseElement: component } = render(<Modal {...clickToCloseModalArgs} isVisible={true} />);
    expect(component).toBeTruthy();
    const content = component.querySelector('div.w-32.h-16.bg-white') as HTMLDivElement;
    expect(content).toBeTruthy();
  });

});
