import { useState, useEffect } from 'react';
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'

import { Banner } from '../Banner/Banner';

import { useBackgroundSwitcherStore } from '../../store/BackgroundSwitcherStore';

import sendMessage from '../../utils/SendMessage'
import { extractAlphaFromRGBA } from '../../utils/Alpha';
import { BackgroundState } from '../../types/Background';

export const BackgroundSwitcher = () => {
  const backgroundState = useBackgroundSwitcherStore.use.backgroundState();
  const setBackgroundState = useBackgroundSwitcherStore.use.setBackgroundState();

  const [color, setColor] = useState('rgba(0,0,0,1)');
  const { valueToHex, rgbaArr } = useColorPicker(color, setColor);

  const hexString = valueToHex();
  const alpha = extractAlphaFromRGBA(rgbaArr);

  useEffect(() => {
    if (backgroundState === 'on') {
      sendMessage({ command: 'changeBackgroundColor', data: { color:hexString, alpha } });
    }
  }, [color]);
  
  const handleBackgroundStateChange = (state: BackgroundState) => {
    setBackgroundState(state);
    sendMessage({ command: 'switchBackground', data: state });
  };

  const handleBackgroundColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <div>
      <Banner title="Background Switcher" />
      <div className="flex items-center justify-center space-x-4 p-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={backgroundState === 'on'}
            onChange={(e) => handleBackgroundStateChange(e.target.checked ? 'on' : 'off')}
          />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">Off</span>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">On</span>
      </div>
      {backgroundState === 'on' && (
        <div className="flex justify-center items-center">
          <ColorPicker
            value={color}
            onChange={handleBackgroundColorChange}
            hideControls={true}
            hideGradientType={true}
            hideGradientControls={true}
          />
        </div>
      )}
    </div>
  );
};