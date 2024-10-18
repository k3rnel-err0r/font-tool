import { FillSettings } from "./Layer";
import { Vec2D } from "./Vec2D";

export type FontSettings = {
    fontSize?: number;
    floatOffset?: Vec2D;
    text?: string;
    textColor?: string;
    font?: string;
    fillSettings?: FillSettings[];
}