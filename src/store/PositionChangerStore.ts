import { create } from 'zustand';

import { createSelectors } from './Selectors';

import { Vec2D } from '../types/Vec2D';

type PositionChangerStoreState = {
  position: Vec2D;
  setPosition: (position: Vec2D) => void;
};

const usePositionChangerStoreBase = create<PositionChangerStoreState>((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position: Vec2D) => set({ position })
}));

export const usePositionChangerStore = createSelectors(usePositionChangerStoreBase);