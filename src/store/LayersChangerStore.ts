import { create, UseBoundStore, StoreApi } from 'zustand';

import { createSelectors } from './Selectors';

import { FillChangerStoreState } from './FillChangerStore';

import { basicFillSettings, basicLayer, Layer } from '../types/Layer';
import { Gradient, GradientStop } from '../types/Gradient';

type LayerChangerStoreState = {
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;

  fillChangerStores: UseBoundStore<StoreApi<FillChangerStoreState>>[];
  setFillChangerStores: (fillChangers: UseBoundStore<StoreApi<FillChangerStoreState>>[]) => void;
};

const useLayersChangerStoreBase = create<LayerChangerStoreState>((set) => ({
  layers: [basicLayer],
  setLayers: (layers: Layer[]) => set({ layers }),

  fillChangerStores: [
    create<FillChangerStoreState>((set) => ({
      gradient: { type: 'vertical', stops: [], reverse: false },
      setGradient: (gradient: Gradient) => set({ gradient }),

      selectedOption: 'color',
      setSelectedOption: (option: string) => set({ selectedOption: option }),

      stops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#000000' }
      ],
      setStops: (stops: GradientStop[]) => set({ stops }),

      color: '#ffffff',
      setColor: (color: string) => set({ color }),

      gradientType: 'horizontal',
      setGradientType: (gradientType: string) => set({ gradientType }),

      gradientLayer: {
        ...basicFillSettings
      }
    }))
  ] as UseBoundStore<StoreApi<FillChangerStoreState>>[],
  setFillChangerStores: (fillChangers: UseBoundStore<StoreApi<FillChangerStoreState>>[]) =>
    set({ fillChangerStores: fillChangers })
}));

export const useLayersChangerStore = createSelectors(useLayersChangerStoreBase);
