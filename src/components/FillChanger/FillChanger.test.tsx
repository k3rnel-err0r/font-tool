import { render, screen, fireEvent } from '@testing-library/react';
import FillChanger from './FillChanger';

describe('Basic Input Tests on <FillChanger />', () => {
    it('it should render the initial state of the component and check the values are correct', () => {
        render(<FillChanger index={0} />);
        const colorRadioElement: HTMLInputElement = screen.getByLabelText('Color');
        const gradientRadioElement: HTMLInputElement = screen.getByLabelText('Gradient');
        const fillColorInputElement: HTMLInputElement = screen.getByLabelText('Fill color:');

        expect(colorRadioElement.checked).toBe(true);
        expect(gradientRadioElement.checked).toBe(false);
        expect(fillColorInputElement.value).toBe('#ffffff');
    });

    it('it should render the initial state of the component and update the label fill color', () => {
        render(<FillChanger index={0} />);
        const colorRadioElement: HTMLInputElement = screen.getByLabelText('Color');
        const gradientRadioElement: HTMLInputElement = screen.getByLabelText('Gradient');
        const fillColorInputElement: HTMLInputElement = screen.getByLabelText('Fill color:');

        fireEvent.change(fillColorInputElement, { target: { value: '#1625c9' } });

        expect(colorRadioElement.checked).toBe(true);
        expect(gradientRadioElement.checked).toBe(false);
        expect(fillColorInputElement.value).toBe('#1625c9');
    });
});