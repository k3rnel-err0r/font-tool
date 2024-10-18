import { create, UseBoundStore, StoreApi } from 'zustand';
import { FillChangerStoreState } from '../../store/FillChangerStore';

import { Banner } from '../Banner/Banner';
import { FillChanger } from '../FillChanger/FillChanger';

import { Layer, basicLayer, basicFillSettings } from '../../types/Layer';
import { Gradient, GradientStop } from '../../types/Gradient';
import { useLayersChangerStore } from '../../store/LayersChangerStore';

import sendMessage from '../../utils/SendMessage';
import { getRandomColor } from '../../utils/RandomColor';

export const LayerStackChanger = () => {
  const layers = useLayersChangerStore.use.layers() as Layer[];
  const setLayers = useLayersChangerStore.use.setLayers();

  const fillChangerStores = useLayersChangerStore.use.fillChangerStores();
  const setFillChangerStores = useLayersChangerStore.use.setFillChangerStores();

  const handleAddLayer = () => {
    const newLayer = {
      ...basicLayer,
      layerName: `border ${layers.length}`,
      layerType: 'border',
      borderSize: layers[0].borderSize + 10
    } as Layer;

    const newFillChangerStore = create<FillChangerStoreState>((set) => ({
      gradient: {
        type: 'vertical',
        stops: [
          { offset: 0, color: '#ffffff' },
          { offset: 1, color: '#000000' }
        ],
        reverse: false
      },
      setGradient: (gradient: Gradient) => set({ gradient }),

      selectedOption: 'color',
      setSelectedOption: (option: string) => set({ selectedOption: option }),

      stops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#000000' }
      ],
      setStops: (stops: GradientStop[]) => set({ stops }),

      color: getRandomColor(),
      setColor: (color: string) => set({ color }),

      gradientType: 'vertical',
      setGradientType: (gradientType: string) => set({ gradientType }),

      gradientLayer: {
        ...basicFillSettings
      }
    }));

    setLayers([newLayer, ...layers]);
    setFillChangerStores([newFillChangerStore, ...fillChangerStores]);
    sendMessage({ command: 'changeLayerSettings', data: [newLayer, ...layers] });

    // send message for new layer first then old info
    if (newFillChangerStore && newFillChangerStore.getState().selectedOption === 'color') {
      sendMessage({ command: 'changeLayerColor', data: { index: 0, newColor: newFillChangerStore.getState().color } });
    } else if (newFillChangerStore && newFillChangerStore.getState().selectedOption === 'gradient') {
      sendMessage({
        command: 'changeLayerGradient',
        data: { index: 0, gradient: newFillChangerStore.getState().gradient }
      });
    }

    updateRemainingFillChangerStores(fillChangerStores, true);
  };

  const handleRemoveLayer = (index: number) => {
    return () => {
      const newLayers = [...layers];
      newLayers.splice(index, 1);

      setLayers(newLayers);
      setFillChangerStores(fillChangerStores.filter((_, i) => i !== index));

      sendMessage({ command: 'changeLayerSettings', data: newLayers });

      const newFillChangerStores = fillChangerStores.filter((_, i) => i !== index);

      updateRemainingFillChangerStores(newFillChangerStores, false);
    };
  };

  const handleLayerNameChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newLayerName = e.target.value;
      const newLayers = [...layers];
      newLayers[index].layerName = newLayerName;
      setLayers(newLayers);

      sendMessage({ command: 'changeLayerSettings', data: newLayers });
    };
  };

  const handleLayerSizeChange = (index: number, size: string) => {
    const newLayers = [...layers];
    newLayers[index].borderSize = parseInt(size, 10);

    const fillLayer = newLayers.find((layer) => layer.layerType === 'fill') as Layer;
    const borderLayers = newLayers.filter((layer) => layer.layerType === 'border');

    borderLayers.sort((a, b) => b.borderSize - a.borderSize);

    newLayers.splice(0, newLayers.length, ...borderLayers, fillLayer);

    setLayers(newLayers);
    sendMessage({ command: 'changeLayerSettings', data: [...borderLayers, fillLayer] });
  };

  const updateRemainingFillChangerStores = (fillChangerStoresArr: UseBoundStore<StoreApi<FillChangerStoreState>>[], addStore: boolean) => {
    const addExtraStore = addStore ? 1 : 0;

    for (let i = 0; i < fillChangerStoresArr.length; i++) {
      if (fillChangerStoresArr[i].getState().selectedOption === 'color') {
        const newColor = fillChangerStoresArr[i].getState().color;
        sendMessage({ command: 'changeLayerColor', data: { index: i + addExtraStore, newColor } });
      } else {
        const gradient = fillChangerStoresArr[i].getState().gradient;
        sendMessage({ command: 'changeLayerGradient', data: { index: i + addExtraStore, gradient } });
      }
    }
  } 

  /* REF CODE ONLY */
  // const handleMoveLayer = (index: number, direction: 'up' | 'down') => {
  //   return () => {
  //     const newIndex = direction === 'up' ? index - 1 : index + 1;
  //     const newLayers = [...layers];
  //     const [movedLayer] = newLayers.splice(index, 1);
  //     newLayers.splice(newIndex, 0, movedLayer);
  //     setLayers(newLayers);

  //     const newFillChangerStores = [...fillChangerStores];
  //     const [movedFillChangerStore] = newFillChangerStores.splice(index, 1);
  //     newFillChangerStores.splice(newIndex, 0, movedFillChangerStore);
  //     setFillChangerStores(newFillChangerStores);

  //     sendMessage({ command: 'moveLayerSettings', data: { direction, index } });
  //   };
  // };

  return (
    <>
      <Banner title="Layers" />
      <button
        className="mt-2 ml-2 translate-x border-solid border-2 rounded border-black bg-slate-100 w-[97.5%]"
        onClick={handleAddLayer}
      >
        Add Layer
      </button>
      {layers.map((layer, i) => {
        return (
          <>
            <ol key={i} className="m-2 border-solid border-2 rounded border-black bg-neutral-200 px-1">
              <li className="mt-1 font-bold text-center flex ustify-between items-center">
                <span className="flex-grow text-center">Layer Settings</span>
                <span className="ml-auto w-8 text-center rounded bg-teal-500">{layers.length - i}</span>{' '}
              </li>
              <li className="flex items-center">
                <button
                  className="mb-2 border-solid border-2 rounded border-black bg-red-400 px-2 font-bold disabled:opacity-70 disabled:line-through"
                  onClick={handleRemoveLayer(i)}
                  disabled={layer.layerType === 'fill'}
                >
                  Remove Layer
                </button>
                {/* REF CODE ONLY */}
                {/* <button
                  className="m-1 border-solid border-2 rounded border-black bg-slate-100 px-2 disabled:opacity-50"
                  onClick={handleMoveLayer(i, 'down')}
                  disabled={i === layers.length - 1}
                >
                  Move Layer Down 🔽
                </button>
                <button
                  className="m-1 border-solid border-2 rounded border-black bg-slate-100 px-2 disabled:opacity-50"
                  onClick={handleMoveLayer(i, 'up')}
                  disabled={i === 0}
                >
                  Move Layer Up 🔼
                </button> */}
              </li>
              <li>
                Layer Name:{' '}
                <input
                  type="text"
                  className="input-text mb-2 pl-1 border-solid border-2 rounded border-black bg-slate-100"
                  value={layer.layerName}
                  onChange={handleLayerNameChange(i)}
                />
                {' | '}
                {layer.layerName}
              </li>
              {layer.layerType === 'border' ? (
                <li>
                  Border Thickness:{' '}
                  <input
                    type="range"
                    step="1"
                    min="0"
                    max="100"
                    value={layer.borderSize}
                    onChange={(e) => handleLayerSizeChange(i, e.target.value)}
                    className="translate-y-[2px]"
                  />{' '}
                  {layer.borderSize}
                </li>
              ) : null}

              <li>
                <hr className="mt-1 border-1 border-gray-800 w-[645px] translate-x-[-4px]" />
                <FillChanger index={i} />
              </li>
            </ol>
          </>
        );
      })}
      <hr />
    </>
  );
};
