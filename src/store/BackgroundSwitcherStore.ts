import { create } from 'zustand';

import { createSelectors } from './Selectors';

import { BackgroundState } from '../types/Background';

type BackgroundSwitcherStoreState = {
  backgroundState: BackgroundState;
  setBackgroundState: (state: BackgroundState) => void;
};

const useBackgroundSwitcherStoreBase = create<BackgroundSwitcherStoreState>((set) => ({
  backgroundState: 'off',
  setBackgroundState: (state: BackgroundState) => set({ backgroundState: state }),
}));

export const useBackgroundSwitcherStore = createSelectors(useBackgroundSwitcherStoreBase);
