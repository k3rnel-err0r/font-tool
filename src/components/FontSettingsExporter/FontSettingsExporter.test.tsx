import { render, screen } from '@testing-library/react';
import { FontSettingsExporter } from './FontSettingsExporter';

import { FontSettings } from '../../types/Font';

describe('Basics Tests on <FontSettingsExporter />', () => {
  const basicFontSettings: FontSettings = {
    text: 'Hello, world!',
    floatOffset: { x: 0, y: 0 },
    fontSize: 100,
    textColor: "#000000"
  };

  it('it should render the FontSettingsExporter', () => {
    render(<FontSettingsExporter />);
    const fontSettingsExporter = screen.getByText('Font Settings Exporter');
    expect(fontSettingsExporter).toBeVisible();
  });

  it('it should render the textarea with the correct value', () => {
    render(<FontSettingsExporter />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(JSON.stringify(basicFontSettings, null, 2));
  });

  it('it should render the copy to clipboard button', () => {
    render(<FontSettingsExporter />);
    const copyButton = screen.getByText('Copy to Clipboard');
    expect(copyButton).toBeVisible();
  });

  it('it should render the save as JSON button', () => {
    render(<FontSettingsExporter />);
    const saveButton = screen.getByText('Save as JSON');
    expect(saveButton).toBeVisible();
  });
});
