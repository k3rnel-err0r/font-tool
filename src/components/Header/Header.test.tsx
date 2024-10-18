import { render, screen } from '@testing-library/react';

import { Header } from './Header';

import { version } from '../../settings/Version';

describe('Basics Tests on <Header />', () => {
  it('it should render the Header', () => {
    render(<Header />);

    const header = screen.getByText('SYNERGY FONT TOOL');
    expect(header).toBeVisible();
  });

  it('it should render the Header with correct version', () => {
    render(<Header />);

    const paragraph = screen.getByText(/v\d+\.\d+\.\d+/);
    expect(paragraph).toBeVisible();
    expect(paragraph.textContent).toBe(`v${version}`);
  });
});