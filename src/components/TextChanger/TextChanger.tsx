import { Banner } from '../Banner/Banner';

import { useTextChangerStore } from '../../store/TextChangerStore';
import { useFontChangerStore } from '../../store/FontChangerStore';

import sendMessage from '../../utils/SendMessage';

export const TextChanger = () => {
  const labelText = useTextChangerStore.use.labelText();
  const setLabelText = useTextChangerStore.use.setLabelText();
  
  const currentLocaleStrings = useTextChangerStore.use.currentLocaleStrings();
  const localeCodes = useTextChangerStore.use.localeCodes();
  const stringSource = useTextChangerStore.use.stringSource();

  const selectedKeyString = useTextChangerStore.use.selectedKeyString();
  const setSelectedKeyString = useTextChangerStore.use.setSelectedKeyString();

  const setCurrentFontSettings = useFontChangerStore.use.setCurrentFontSettings();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const text = e.target.value;
    setLabelText(text);
    setCurrentFontSettings({ text });
    sendMessage({ command: "changeLabelText", data: text });
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    setLabelText(currentLocaleStrings[selectedKey]);
    setCurrentFontSettings({ text: currentLocaleStrings[selectedKey] });
    sendMessage({ command: 'changeLabelText', data: currentLocaleStrings[selectedKey] });
    setSelectedKeyString(selectedKey);
  };

  const onLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (stringSource === '') {
      sendMessage({ command: 'changeLocale', data: lang });
    } else {
      const data = {
        lang,
        selectedKeyString
      }
      sendMessage({ command: 'changeLocale', data: data });
    }
  };

  return (
    <div>
      <Banner title="Text" />
      <div className='px-2 my-2'>
        <label htmlFor="textInput">Text: </label>
        <input className="text-center border-2 border-solid px-0 rounded border-black bg-slate-100" id="textInput" type="text" value={labelText} onChange={onInputChange} />
      </div>
      <div className='px-2 my-2'>
        <label htmlFor="textFromGame">Text from game: </label>
        <select className="py-0 px-2 text-center pe-2 border-black bg-slate-100 border-2 focus:outline-none rounded text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" id="textFromGame" value={selectedKeyString} onChange={onSelectChange} aria-label="Select text">
          {Object.keys(currentLocaleStrings).map((key, i) => (
            <option value={key} key={i}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className='px-2 my-2'>
        <label htmlFor="languageSelect">Language: </label>
        <select className="py-0 px-2 text-center pe-2 border-black bg-slate-100 border-2 focus:outline-none rounded text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" id="languageSelect" onChange={onLangChange}>
          {localeCodes.map((code, i) => (
            <option value={code} key={i}>
              {code}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};
