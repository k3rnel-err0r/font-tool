import { useEffect } from 'react';

import { useTextChangerStore } from '../store/TextChangerStore';
import { useFontChangerStore } from '../store/FontChangerStore';

import sendMessage from '../utils/SendMessage';

import { MessageData } from '../types/MessageData';
import { LocaleCodes, LocalisationStrings } from '../types/Localisation';

export const useMessageListener = () => {

  const setCurrentLocaleStrings = useTextChangerStore.use.setCurrentLocaleStrings();
  const setLocaleCodes = useTextChangerStore.use.setLocaleCodes();
  const setStringSource = useTextChangerStore.use.setStringSource();
  const setFontAssetsList = useFontChangerStore.use.setFontAssetsList();
  const setCurrentFont = useFontChangerStore.use.setCurrentFont();
  const setFontWeightList = useFontChangerStore.use.setFontWeightList();
  const setCurrentFontWeight = useFontChangerStore.use.setCurrentFontWeight();
  const setFontStringForSettings = useFontChangerStore.use.setFontStringForSettings();
  const setFontSize = useFontChangerStore.use.setFontSize();
  
  useEffect(() => {

    const receiveMessage = (event: MessageData) => {
      const { strings, localeCodes, text, fonts, currentFont, currentFontSize, subFonts, currentSubFont, fontString } =
        event.data;

      if (strings) {
        const parsedStrings = JSON.parse(strings) as LocalisationStrings;
        setCurrentLocaleStrings({ ...parsedStrings });
      }

      if (localeCodes) {
        const parsedLocaleCodes = JSON.parse(localeCodes) as LocaleCodes;
        setLocaleCodes([...parsedLocaleCodes]);
      }

      if (text) {
        setStringSource(text);
      }

      if (fonts) {
        console.log('non-parse data', fonts);
        const parsedFontsData = JSON.parse(fonts);

        console.log('parse data', parsedFontsData);
        setFontAssetsList([...parsedFontsData]);
      }
      if (currentFont) {
        console.log('non-parse data', currentFont);
        const parsedFontsData = JSON.parse(currentFont);

        console.log('parse data', parsedFontsData);
        setCurrentFont(parsedFontsData);
      }

      if (currentFontSize) {
        console.log('non-parse data', currentFontSize);
        const parsedFontsData = JSON.parse(currentFontSize);

        console.log('parse data', Number(parsedFontsData));
        setFontSize(Number(parsedFontsData));
      }
      if (subFonts) {
        console.log('non-parse data', subFonts);
        const parsedFontsData = JSON.parse(subFonts);

        console.log('parse data', parsedFontsData);
        setFontWeightList([...parsedFontsData]);
      }
      if (currentSubFont) {
        console.log('non-parse data', currentSubFont);
        const parsedFontsData = JSON.parse(currentSubFont);

        console.log('parse data', parsedFontsData);
        setCurrentFontWeight(parsedFontsData);
      }
      if (fontString) {
        console.log('non-parse data', fontString);
        const parsedFontsData = JSON.parse(fontString);

        console.log('parse data', parsedFontsData);
        setFontStringForSettings(parsedFontsData);
      }
    };

    const onBeforeUnload = () => {
      sendMessage({ command: 'disposeLabel', data: null });
    };

    window.addEventListener('message', receiveMessage, false);
    window.addEventListener('beforeunload', onBeforeUnload, false);
    return () => {
      window.removeEventListener('message', receiveMessage, false);
      window.removeEventListener('beforeunload', onBeforeUnload, false);
    };
  }, []);
};
