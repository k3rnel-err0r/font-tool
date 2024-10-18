import { render, screen } from '@testing-library/react';

import { BackgroundSwitcher } from './BackgroundSwitcher';

describe('Basics Tests on <BackgroundSwitcher />', () => {
  it('it should render the Banner with the correct title', () => {
    render(<BackgroundSwitcher />);
    const bannerElement = screen.getByText('Background Switcher');
    expect(bannerElement).toBeVisible();
  });

  it('it should render the checkbox', () => {
    render(<BackgroundSwitcher />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeVisible();
  });

  it('it should render the checkbox with the correct checked state', () => {
    render(<BackgroundSwitcher />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).not.toBeChecked();
  });
});