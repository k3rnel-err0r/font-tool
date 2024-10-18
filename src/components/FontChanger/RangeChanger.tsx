import { useEffect, useState } from 'react';
import { RangeChangerProps } from './RangeChangerProps';

import { useFontChangerStore } from '../../store/FontChangerStore';
import sendMessage from '../../utils/SendMessage';

export const RangeChanger = ({ typeVal }: RangeChangerProps) => {
  const fontSize = useFontChangerStore.use.fontSize();
  const setFontSize = useFontChangerStore.use.setFontSize();
  const setCurrentFontSettings = useFontChangerStore.use.setCurrentFontSettings();
  const miterLimit = useFontChangerStore.use.miterLimit();
  const setMitterLimit = useFontChangerStore.use.setMitterLimit();

  const [rangeSetting, setRangeSetting] = useState({ minVal: 0, maxVal: 0 });

  useEffect(() => {
    typeVal == 'fontSize' && setCurrentFontSettings({ fontSize: fontSize });
    if (typeVal === 'fontSize') {
      setFontSize(fontSize);
      setRangeSetting({ minVal: 6, maxVal: 150 });
    } else {
      setMitterLimit(miterLimit);
      setRangeSetting({ minVal: 0, maxVal: 10 });
    }
  }, [fontSize, miterLimit]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const msg = {
      command: typeVal == 'fontSize' ? ('changeFontSize' as const) : ('changeMiterLimit' as const),
      data: 0
    };
    if (typeVal === 'fontSize') {
      setFontSize(Number(e.target.value));
      typeVal == 'fontSize' && setCurrentFontSettings({ fontSize: fontSize });
      msg.data = Number(e.target.value);
    } else {
      setMitterLimit(Number(e.target.value));
      msg.data = Number(e.target.value);
    }

    sendMessage({ command: msg.command, data: msg.data });
  };

  const handleFontRangeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const msg = {
        command: typeVal == 'fontSize' ? ('changeFontSize' as const) : ('changeMiterLimit' as const),
        data: 0
      };

      if (typeVal == 'fontSize') {
        setFontSize(Number(e.target.value));
        msg.data = Number(e.target.value);
        setCurrentFontSettings({ fontSize: Number(e.target.value) });
      } else {
        setMitterLimit(Number(e.target.value));
        msg.data = Number(e.target.value);
      }

      sendMessage({ command: msg.command, data: msg.data });
    } else {
      if (typeVal == 'fontSize') {
        setFontSize(0);
        setCurrentFontSettings({ fontSize: 0 });
      } else {
        setMitterLimit(0);
      }
    }
  };

  return (
    <div className='px-2 my-4'>
      <label htmlFor={'font' + typeVal == 'fontSize' ? 'Font Size' : 'Miter Limit'}>
        {typeVal == 'fontSize' ? 'Font Size' : 'Miter Limit'}:
        <input
          type="range"
          min={rangeSetting.minVal}
          max={rangeSetting.maxVal}
          value={typeVal === 'fontSize' ? fontSize : miterLimit}
          onChange={handleRangeChange}
        />
      </label>
      <input
      className='text-center border-2 border-solid w-12 h-6 px-0 rounded border-black bg-slate-100'
        type="text"
        value={typeVal === 'fontSize' ? fontSize : miterLimit}
        onChange={handleFontRangeTextValue}
      />
    </div>
  );
};
