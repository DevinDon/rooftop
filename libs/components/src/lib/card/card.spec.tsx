/* eslint-disable react/jsx-no-useless-fragment */
import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { cardWithLinkArgs, cardWithoutLinkArgs } from './args';
import { CardComponent } from './card';

describe('CardComponent', () => {

  it('should render successfully without link', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithoutLinkArgs} />);
    expect(component).toBeTruthy();
  });

  it('should render successfully with link', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithLinkArgs} />);
    expect(component).toBeTruthy();
  });

  it('should has <h3> title and correct content', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithoutLinkArgs} />);
    const title = component.querySelector('h3') as HTMLHeadingElement;
    expect(title).toBeTruthy();
    expect(title.textContent).toEqual(cardWithoutLinkArgs.title);
  });

  it('should has <p> desc and correct content', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithoutLinkArgs} />);
    const desc = component.querySelector('h3 + p') as HTMLParagraphElement;
    expect(desc).toBeTruthy();
    expect(desc.textContent).toEqual(cardWithoutLinkArgs.desc);
  });

  it('should has <div> body and correct content', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithoutLinkArgs} />);
    const body = component.querySelector('p + div') as HTMLDivElement;
    expect(body).toBeTruthy();
    expect(body.textContent).toEqual('这里是内容这里是内容这里是内容这里是内容这里这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容');
  });

  it('should has <div> footer and correct content', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithoutLinkArgs} />);
    const footer = component.querySelector('div + div') as HTMLDivElement;
    expect(footer).toBeTruthy();
    expect(footer.textContent).toEqual('版权所有 夜寒苏 © 2021+');
  });

  it('should has <a> link and correct content', () => {
    const { baseElement: component } = render(<CardComponent {...cardWithLinkArgs} />);
    const link = component.querySelector('a') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.href).toEqual(cardWithLinkArgs.link?.url);
    expect(link.target).toEqual(cardWithLinkArgs.link?.inNewTab ? '_blank' : '_self');
  });

});
