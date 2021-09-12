import { render } from '@testing-library/react';
import { AppContainer } from './app-container';
import { ARGS_WITHOUT_CONTENT, ARGS_WITH_CONTENT } from './args';

describe('AppContainer', () => {

  it('should render app container without content', () => {
    const { baseElement: component } = render(<AppContainer {...ARGS_WITHOUT_CONTENT} />);
    expect(component).toBeTruthy();
    expect(component.querySelector('div.flex.flex-col.min-h-screen > *')).toBeFalsy();
  });

  it('should render app container with "Hello, world!"', () => {
    const { baseElement: component, getByText } = render(<AppContainer {...ARGS_WITH_CONTENT} />);
    expect(component).toBeTruthy();
    expect(getByText('Hello, world!', { selector: 'div.flex.flex-col.min-h-screen > p' })).toBeTruthy();
  });

});
