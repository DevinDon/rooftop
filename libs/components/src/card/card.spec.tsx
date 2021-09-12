import { render } from '@testing-library/react';
import { ARGS_WITH_LINK, ARGS_WITHOUT_LINK, CardContainerContent } from './args';
import { Card } from './card';

describe('Card', () => {

  it('should render component with link', () => {
    const { baseElement: component } = render(<Card.Container {...ARGS_WITH_LINK} children={CardContainerContent} />);
    expect(component).toBeTruthy();
    expect(component.querySelector('a')).toBeTruthy();
    expect(component.querySelector('a h3')).toBeTruthy();
    expect(component.querySelector('a h3 + p')).toBeTruthy();
    expect(component.querySelector('a p + div')).toBeTruthy();
    expect(component.querySelector('a div + div')).toBeTruthy();
  });

  it('should render component without link', () => {
    const { baseElement: component } = render(<Card.Container {...ARGS_WITHOUT_LINK} children={CardContainerContent} />);
    expect(component).toBeTruthy();
    expect(component.querySelector('h3')).toBeTruthy();
    expect(component.querySelector('h3 + p')).toBeTruthy();
    expect(component.querySelector('p + div')).toBeTruthy();
    expect(component.querySelector('div + div')).toBeTruthy();
  });

  it('should has <a> link and correct content', () => {
    const { baseElement: component } = render(<Card.Container {...ARGS_WITH_LINK} children={CardContainerContent} />);
    const link = component.querySelector('a') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.href).toEqual(ARGS_WITH_LINK.link?.url);
    expect(link.target).toEqual(ARGS_WITH_LINK.link?.inNewTab ? '_blank' : '_self');
  });

});
