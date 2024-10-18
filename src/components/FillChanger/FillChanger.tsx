import { createSelectors } from '../../store/Selectors';
import { useFontChangerStore } from '../../store/FontChangerStore';
import { useLayersChangerStore } from '../../store/LayersChangerStore';

import { basicFillSettings } from '../../types/Layer';
import { GradientStop, GradientType } from '../../types/Gradient';

import sendMessage from '../../utils/SendMessage';

type StopChangeProps = {
  stopIndex: number;
  field: string;
  value: string | number;
  stop: GradientStop
}

export const FillChanger = ({ index }: { index: number }) => {
  const currentFillChangerStore = useLayersChangerStore.use.fillChangerStores()[index];

  const fillChanger = createSelectors(currentFillChangerStore);

  const gradient = fillChanger.use.gradient();
  const setGradient = fillChanger.use.setGradient();
  const selectedOption = fillChanger.use.selectedOption();
  const setSelectedOption = fillChanger.use.setSelectedOption();
  const stops = fillChanger.use.stops();
  const setStops = fillChanger.use.setStops();
  const color = fillChanger.use.color();
  const setColor = fillChanger.use.setColor();
  const gradientType = fillChanger.use.gradientType();
  const setGradientType = fillChanger.use.setGradientType();

  const currentFontSettings = useFontChangerStore.use.currentFontSettings();
  const setCurrentFontSettings = useFontChangerStore.use.setCurrentFontSettings();

  const handleGradientTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGradientType = event.target.value as GradientType;
    gradient.type = newGradientType;
    setGradientType(newGradientType);
    sendMessage({ command: 'changeLayerGradient', data: { index, gradient } });
    setCurrentFontSettings({
      ...currentFontSettings,
      textColor: color,
      fillSettings: [
        {
          ...basicFillSettings,
          gradient: { type: newGradientType, stops: stops, reverse: false }
        }
      ]
    });
  };

  const addStop = (stop: GradientStop) => {
    setStops([...stops, stop]);
    stops.push(stop);
    gradient.reverse = false;
    gradient.stops = stops;
    gradient.stopIndex = stops.length - 1;
    setGradient(gradient);
    setCurrentFontSettings({
      ...currentFontSettings,
      textColor: color,
      fillSettings: [
        {
          ...basicFillSettings,
          gradient: { type: gradient.type, stops: stops, reverse: false }
        }
      ]
    });

    sendMessage({ command: 'changeLayerGradient', data: { index, gradient } });
  };

  const handleStopChange = (stopChangeProps: StopChangeProps) => {
    const { stopIndex, field, value, stop } = stopChangeProps;
    setStops(stops.map((stop, i) => (i === stopIndex ? { ...stop, [field]: value } : stop)));
    if (field === 'offset') {
      stop.offset = Number(value);
    }
    if (field === 'color') {
      stop.color = String(value);
    }
    gradient.stops = stops;
    gradient.stopIndex = stopIndex;
    setCurrentFontSettings({
      ...currentFontSettings,
      textColor: color,
      fillSettings: [
        {
          ...basicFillSettings,
          gradient: { type: gradient.type, stops: stops, reverse: false }
        }
      ]
    });

    sendMessage({ command: 'changeLayerGradient', data: { index: index, gradient } });
  };

  const deleteStop = (deleteIndex: number) => {
    setStops(stops.filter((_, i) => i !== deleteIndex));
    gradient.stopIndex = deleteIndex;
    gradient.removeStop = true;

    sendMessage({ command: 'changeLayerGradient', data: { deleteIndex, gradient } });
    stops.splice(deleteIndex, 1);
    gradient.stops = stops;
    if (stops.length === 0) {
      setCurrentFontSettings({ textColor: color, fillSettings: [] });
    } else {
      setCurrentFontSettings({
        ...currentFontSettings,
        textColor: color,
        fillSettings: [
          {
            ...basicFillSettings,
            gradient: { type: gradient.type, stops: stops, reverse: false }
          }
        ]
      });
    }
    gradient.removeStop = false;
  };

  const handleOptionChange = (option: string) => {
    setColor('#ffffff');
    setSelectedOption(option);
    if (option === 'color') {
      sendMessage({ command: 'changeLayerColor', data: { index, newColor: color } });
      setCurrentFontSettings({ textColor: color, fillSettings: [] });
    }
    if (option === 'gradient') {
        setStops(stops);
        gradient.stops = stops;
        sendMessage({ command: 'changeLayerGradient', data: { index, gradient } });
        gradient.type == 'vertical' ? setGradientType("vertical") : setGradientType("horizontal");
        setCurrentFontSettings({
        ...currentFontSettings,
        textColor: color,
        fillSettings: [
            {
            ...basicFillSettings,
            gradient: { type: gradient.type, stops: stops, reverse: false }
            }
        ]
    })};
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    setCurrentFontSettings({ textColor: newColor });
    sendMessage({ command: 'changeLayerColor', data: { index, newColor } });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="font-bold text-center w-full mt-1"> Fill Settings </div>
      <div className="">
        <div className="my-2">
          <label>
            <input
              type="radio"
              value="color"
              checked={selectedOption === 'color'}
              onChange={() => handleOptionChange('color')}
            />
            &nbsp;Color&nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="gradient"
              checked={selectedOption === 'gradient'}
              onChange={() => handleOptionChange('gradient')}
            />
            &nbsp;Gradient
          </label>
        </div>
        {selectedOption === 'color' ? (
          <div className="my-2">
            <label htmlFor="fillColor">Fill color: &nbsp;</label>
            <input className="w-15 h-5" id="fillColor" onChange={handleColorChange} value={color} type="color" />
          </div>
        ) : (
          <div>
            <label htmlFor="gradientType">Type: </label>
            <select id="gradientType" value={gradientType} onChange={handleGradientTypeChange}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
            <div>
              <label htmlFor="gradientStops">Stops: </label>
              <button
                className="m-2 border-solid border-2 rounded border-black bg-slate-100 px-2"
                onClick={() => addStop({ offset: 0, color: color })}
              >
                Add Stop
              </button>
              {stops.map((stop, j) => (
                <div key={j} data-testid="stop">
                  <label htmlFor={`stopOffset${j}`}> Offset: </label>
                  <input
                    id={`stopOffset${j}`}
                    data-testid={`stopOffset${j}`}
                    value={stop.offset}
                    onChange={(e) => handleStopChange({stopIndex: j, field: 'offset', value: e.target.value, stop: stop})}
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    className="translate-y-[2px]"
                  />{' '}
                  <label htmlFor={`stopColor${j}`}>Color: </label>
                  <input
                    id={`stopColor${j}`}
                    data-testid={`stopColor${j}`}
                    value={stop.color}
                    onChange={(e) => handleStopChange({stopIndex: j, field: 'color', value: e.target.value, stop: stop})}
                    type="color"
                    className="translate-y-[2px]"
                  />
                  {' | '}
                  <button
                    className="m-2 border-solid border-2 rounded border-black bg-slate-100 px-2"
                    onClick={() => deleteStop(j)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillChanger;
