import { render, screen } from '@testing-library/react';

import { Banner } from './Banner';

describe('Basics Tests on <Banner />', () => {
  it('it should render the Banner', () => {
    render(<Banner title="Test Banner" />);
    const banner = screen.getByText('Test Banner');
    expect(banner).toBeVisible();
  });
});
