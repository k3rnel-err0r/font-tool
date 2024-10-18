import { Vec2D } from "./Vec2D";

//** Gradient  */
export type Gradient = { 
    type: GradientType;
    stops: GradientStop[];
    reverse: boolean;
    stopIndex?: number;
    removeStop?: boolean;
    posA?: Vec2D;
    posB?: Vec2D;
    offset?: Vec2D;
    radialPos?: Vec2D;
    radius?: number;
};

export type GradientType = 'linear' | 'horizontal' | 'vertical' | 'radial';

export type GradientStop = { 
    offset: number;
    color: string;
};