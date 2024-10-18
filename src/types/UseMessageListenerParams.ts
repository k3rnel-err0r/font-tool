import { LocaleCodes, LocalisationStrings } from './Localisation';
import { SendMessageData } from './MessageData';

export type UseMessageListenerParams = {
  setTextsOptions: React.Dispatch<React.SetStateAction<LocalisationStrings>>;
  setLocaleCodes: React.Dispatch<React.SetStateAction<LocaleCodes>>;
  setStringSource: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (data: SendMessageData<null>) => void;
  setFontsData: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentFont: React.Dispatch<React.SetStateAction<string>>;
  setRangeVal: React.Dispatch<React.SetStateAction<number>>;
  setSubFonts: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentSubFont: React.Dispatch<React.SetStateAction<string>>;
  setFontStringForSetting: React.Dispatch<React.SetStateAction<string>>;
};
