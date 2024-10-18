import { useEffect } from 'react';

import { Header } from './components/Header/Header';
import { TextChanger } from './components/TextChanger/TextChanger';
import { FontSettingsExporter } from './components/FontSettingsExporter/FontSettingsExporter';
import { FontChanger } from './components/FontChanger/FontChanger';
import { LayerStackChanger } from './components/Layers/LayerStackChanger';
import { PositionChanger } from './components/PositionChanger/PositionChanger';
import { BackgroundSwitcher } from './components/BackgroundSwitcher/BackgroundSwitcher';

import { useMessageListener } from './hooks/useMessageListener';

import sendMessage from './utils/SendMessage';

export const App = () => {
  useEffect(() => {
    sendMessage({ command: 'appLoaded', data: null });
  }, []);

  useMessageListener();

  return (
    <>
      <Header />
      <TextChanger />
      <PositionChanger />
      <FontChanger />
      <LayerStackChanger />
      <FontSettingsExporter />
      <BackgroundSwitcher />
    </>
  );
};
