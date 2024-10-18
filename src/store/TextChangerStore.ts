import { create } from 'zustand';

import { basicFontSettings } from '../settings/Font';

import { createSelectors } from './Selectors';
import { LocaleCodes, LocalisationStrings } from '../types/Localisation';

type TextChangerStoreState = {
  labelText: string;
  setLabelText: (text: string) => void;

  localeCodes: LocaleCodes;
  setLocaleCodes: (codes: LocaleCodes) => void;

  currentLocaleStrings: LocalisationStrings;
  setCurrentLocaleStrings: (strings: LocalisationStrings) => void;

  stringSource: string;
  setStringSource: (source: string) => void;

  selectedKeyString: string;
  setSelectedKeyString: (source: string) => void;
};

const useTextChangerStoreBase = create<TextChangerStoreState>((set) => ({
  labelText: basicFontSettings.text || '',
  setLabelText: (text: string) => set({ labelText: text }),

  localeCodes: [],
  setLocaleCodes: (codes: LocaleCodes) => set({ localeCodes: codes }),

  currentLocaleStrings: {},
  setCurrentLocaleStrings: (strings: LocalisationStrings) => set({ currentLocaleStrings: strings }),

  stringSource: '',
  setStringSource: (source: string) => set({ stringSource: source }),

  selectedKeyString: '',
  setSelectedKeyString: (source: string) => set({ selectedKeyString: source })
}));

export const useTextChangerStore = createSelectors(useTextChangerStoreBase);
