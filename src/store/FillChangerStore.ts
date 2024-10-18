import { Gradient, GradientStop } from '../types/Gradient';
import { FillSettings } from '../types/Layer';

export type FillChangerStoreState = {
    gradient: Gradient;
    setGradient: (gradient: Gradient) => void;

    selectedOption: string;
    setSelectedOption: (option: string) => void;

    stops: GradientStop[];
    setStops: (stops: GradientStop[]) => void;

    color: string;
    setColor: (color: string) => void;

    gradientType: string;
    setGradientType: (type: string) => void;

    gradientLayer: FillSettings;
}