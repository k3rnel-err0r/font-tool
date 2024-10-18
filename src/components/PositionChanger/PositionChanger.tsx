import { useEffect } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';

import { Banner } from '../Banner/Banner';

import { usePositionChangerStore } from '../../store/PositionChangerStore';
import { useTextChangerStore } from '../../store/TextChangerStore';
import { useFontChangerStore } from '../../store/FontChangerStore';

import sendMessage from '../../utils/SendMessage';

import './PositionChanger.css';

export const PositionChanger = () => {
  const labelText = useTextChangerStore.use.labelText();
  const position = usePositionChangerStore.use.position();
  const setPosition = usePositionChangerStore.use.setPosition();

  const onFontSettingsChange = useFontChangerStore.use.setCurrentFontSettings();

  useEffect(() => {
    const container = document.getElementById('positionBoxContainer');

    if (container) {
      const width = 480; // 1920 / 4
      const height = 270; // 1080 / 4
      container.style.width = width + 'px';
      container.style.height = height + 'px';
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = (_: DraggableEvent, ui: any) => {
    setPosition({ x: ui.x, y: ui.y });

    const floatOffset = { x: position.x * 4, y: position.y * 4 };
    onFontSettingsChange({ floatOffset });
    sendMessage({ command: 'changePosition', data: floatOffset });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    onFontSettingsChange({ floatOffset: { x: 0, y: 0 } });
    sendMessage({ command: 'changePosition', data: { x: 0, y: 0 } });
  };

  return (
    <>
      <Banner title="Position" />
      <div className='py-2'>
      <button className='ml-3 pl-2 border-solid border-2 rounded border-black bg-slate-100 pe-2' onClick={reset}>Reset</button>
      </div>
      <div className='m-1' id="positionBoxContainer">
        <div id="dragContainer">
          <Draggable bounds="parent" onDrag={handleDrag} position={position}>
            <div id="positionBox">{labelText}</div>
          </Draggable>
        </div>
      </div>
    </>
  );
};
