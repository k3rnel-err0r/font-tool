import { create } from 'zustand';

import { createSelectors } from './Selectors';

import { basicFontSettings } from '../settings/Font';

import { FontSettings } from '../types/Font';

type FontChangerStoreState = {
  currentFontSettings: FontSettings;
  setCurrentFontSettings: (settings: FontSettings) => void;

  fontAssetsList: string[];
  setFontAssetsList: (fonts: string[]) => void;

  currentFont: string;
  setCurrentFont: (font: string) => void;

  fontWeightList: string[];
  setFontWeightList: (weights: string[]) => void;

  currentFontWeight: string;
  setCurrentFontWeight: (font: string) => void;

  fontStringForSettings: string;
  setFontStringForSettings: (fontString: string) => void;

  fontSize: number;
  setFontSize: (val: number) => void;

  miterLimit: number;
  setMitterLimit: (val: number) => void;
};

const useFontChangerStoreBase = create<FontChangerStoreState>((set) => ({
  currentFontSettings: basicFontSettings,
  setCurrentFontSettings: (settings: FontSettings) =>
    set((state) => ({ currentFontSettings: { ...state.currentFontSettings, ...settings } })),

  fontAssetsList: [],
  setFontAssetsList: (fonts: string[]) => set({ fontAssetsList: fonts }),

  currentFont: '',
  setCurrentFont: (font: string) => set({ currentFont: font }),

  fontWeightList: [],
  setFontWeightList: (weights: string[]) => set({ fontWeightList: weights }),

  currentFontWeight: '',
  setCurrentFontWeight: (font: string) => set({ currentFontWeight: font }),

  fontStringForSettings: '',
  setFontStringForSettings: (fontString: string) => set({ fontStringForSettings: fontString }),

  fontSize: basicFontSettings.fontSize || 0,
  setFontSize: (val: number) => set({ fontSize: val }),

  miterLimit: 0,
  setMitterLimit: (val: number) => set({ miterLimit: val })
}));

export const useFontChangerStore = createSelectors(useFontChangerStoreBase);
