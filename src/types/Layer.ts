import { GradientStop, GradientType } from './Gradient';
import { Vec2D } from './Vec2D';

export type Layer = {
  layerName: string;
  layerType: 'fill' | 'border';
  borderSize: number;
};

export type FillSettings = {
  offset: Vec2D;
  fillType: 'solid' | 'gradient';
  alpha: number;
  gradient?: {
    type: GradientType;
    stops: GradientStop[];
    reverse: boolean;
  };
  fillColor?: string;
};

export const basicLayer: Layer = {
  layerName: 'Fill Layer',
  layerType: 'fill',
  borderSize: 5
};

export const basicFillSettings: FillSettings = {
  offset: { x: 0, y: 0 },
  fillType: 'solid',
  alpha: 1,
  fillColor: '#ffffff'
};
