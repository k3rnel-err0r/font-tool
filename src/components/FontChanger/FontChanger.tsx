import { useEffect, useState } from 'react';

import { Banner } from '../Banner/Banner';
import { RangeChanger } from './RangeChanger';

import { useFontChangerStore } from '../../store/FontChangerStore';

import sendMessage from '../../utils/SendMessage';

export const FontChanger = () => {
  const currentFont = useFontChangerStore.use.currentFont();
  const setCurrentFont = useFontChangerStore.use.setCurrentFont();
  const fontWeightList = useFontChangerStore.use.fontWeightList();
  const currentFontWeight = useFontChangerStore.use.currentFontWeight();
  const setCurrentFontWeight = useFontChangerStore.use.setCurrentFontWeight();
  const fontAssetsList = useFontChangerStore.use.fontAssetsList();
  const setCurrentFontSettings = useFontChangerStore.use.setCurrentFontSettings();
  const fontStringForSettings = useFontChangerStore.use.fontStringForSettings();

  const [selectedMiter, setSelectedMiter] = useState<string>('');

  useEffect(() => {
    setCurrentFontSettings({ font: fontStringForSettings });
  }, [fontStringForSettings]);

  const handleFontChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentFont(e.target.value);
    sendMessage({
      command: 'changeFontAsset',
      data: {
        font: e.target.value,
        subFont: currentFontWeight
      }
    });
  };

  const handleSubFontChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentFontWeight(e.target.value);
    sendMessage({
      command: 'changeFontAsset',
      data: {
        font: currentFont,
        subFont: e.target.value
      }
    });
  };

  const handleMiterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedMiter(e.target.value);
  };

  return (
    <div>
      <Banner title="Font" />
      <div className="px-2 my-2">
        <label htmlFor="fontsFromGame">Fonts from game: </label>
        <select
          className="py-0 px-2 pe-2 border-black bg-slate-100 border-2 focus:outline-none rounded text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          id="fontSelect"
          value={currentFont}
          onChange={handleFontChange}
        >
          {fontAssetsList.map((data, i) => (
            <option value={data} key={i}>
              {data}
            </option>
          ))}
        </select>
        <label className="px-4" htmlFor="fontsFromGame">
          Font Weight:&nbsp;
          <select
            className="text-center pe-0 border-black bg-slate-100 border-2 focus:outline-none rounded text-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            id="FontWeightSelect"
            value={currentFontWeight}
            onChange={handleSubFontChange}
          >
            {fontWeightList.map((data, i) => (
              <option value={data} key={i}>
                {data}
              </option>
            ))}
          </select>
        </label>
      </div>
      <RangeChanger typeVal={'fontSize'} />
      <RangeChanger typeVal={'nofontSize'} />
      <div className='px-2 my-4'>
        <label>Join Type: </label>
        <select className='text-center pe-0 border-black bg-slate-100 border-2 focus:outline-none rounded text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600' id="miterSelect" value={selectedMiter} onChange={handleMiterChange}>
          <option value={'miter1'}>miter1</option>
          <option value={'miter2'}>miter2</option>
        </select>
      </div>
    </div>
  );
};
