import { useState, useRef } from 'react';

import { Banner } from '../Banner/Banner';

import { useTextChangerStore } from '../../store/TextChangerStore';
import { usePositionChangerStore } from '../../store/PositionChangerStore';

import { useFontChangerStore } from '../../store/FontChangerStore';

import sendMessage from '../../utils/SendMessage';

import { FontSettings } from '../../types/Font';

export const FontSettingsExporter = () => {
  const [copyStatus, setCopyStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setFontSettings = useFontChangerStore.use.setCurrentFontSettings();
  const setLabelText = useTextChangerStore.use.setLabelText();
  const setPosition = usePositionChangerStore.use.setPosition();
  const setFontSize = useFontChangerStore.use.setFontSize();

  const settings = useFontChangerStore.use.currentFontSettings();

  const formatSettings = (settings: FontSettings) => {
    return JSON.stringify(settings, null, 2);
  };

  const handleImportFontSettings = (settings: FontSettings) => {
    setFontSettings(settings);
    setLabelText(settings.text || '');
    const floatOffset = { x: (settings?.floatOffset?.x || 0) / 4, y: (settings?.floatOffset?.y || 0) / 4 };
    setPosition(floatOffset);
    setFontSize(Number(settings.fontSize));
    sendMessage({ command: 'importLabelSettings', data: settings });
  };

  const copyToClipboard = () => {
    const formattedSettings = formatSettings(settings);
    navigator.clipboard
      .writeText(formattedSettings)
      .then(() => {
        setCopyStatus('Copied to clipboard!');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        setCopyStatus('Failed to copy');
      });
  };

  const saveAsJSON = () => {
    const formattedSettings = formatSettings(settings);
    const blob = new Blob([formattedSettings], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'font_settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          handleImportFontSettings(importedSettings);
          setCopyStatus('Settings imported successfully!');
          setTimeout(() => setCopyStatus(''), 2000);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
          setCopyStatus('Failed to import settings');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Banner title="Font Settings Exporter" />
      <textarea className='m-1 border-2 border-solid border-black p-3' readOnly value={formatSettings(settings)} rows={10} cols={50} />
      <div>
        <button className='ml-3 pl-2 border-solid border-2 rounded border-black bg-slate-100 pe-2' onClick={saveAsJSON}>Save as JSON</button>
        <button className='ml-3 pl-2 border-solid border-2 rounded border-black bg-slate-100 pe-2' onClick={handleImport}>Import JSON Settings</button>
        <button className='ml-3 pl-2 border-solid border-2 rounded border-black bg-slate-100 pe-2' onClick={copyToClipboard}>Copy to Clipboard</button>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".json" onChange={handleFileChange} />
      </div>
      {copyStatus && <span>{copyStatus}</span>}
    </div>
  );
};
