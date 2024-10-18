import { render, screen } from '@testing-library/react';

import { TextChanger } from './TextChanger';

describe('Basics Tests on <TextChanger />', () => {
  it('it should render the Banner with the correct title', () => {
    render(<TextChanger />);
    const bannerElement = screen.getByText('Text');
    expect(bannerElement).toBeVisible();
  });

  it('it should render the input text', () => {
    render(<TextChanger />);
    const inputElement = screen.getByLabelText('Text:') as HTMLInputElement;
    expect(inputElement).toBeVisible();
  });

  it('it should render the input text with "Hello, world!" value', () => {
    render(<TextChanger  />);
    const inputElement = screen.getByLabelText('Text:') as HTMLInputElement;
    expect(inputElement.value).toBe('Hello, world!');
  });

  it('it should render the select text', () => {
    render(<TextChanger />);
    const selectElement = screen.getByLabelText('Select text');
    expect(selectElement).toBeVisible();
  });

  it('it should render the language select', () => {
    render(<TextChanger />);
    const selectElement = screen.getByLabelText('Language:');
    expect(selectElement).toBeVisible();
  });
});
