export type MessageData = MessageEvent<{
  localeCodes: string;
  strings: string;
  text: string;
  fonts: string;
  currentFont: string;
  currentFontSize: string;
  subFonts: string;
  currentSubFont: string;
  fontString: string;
}>;

type SendMessageDataCommand =
  | 'appLoaded'
  | 'changeBackgroundColor'
  | 'changeFontAsset'
  | 'changeFontSize'
  | 'changeLabelText'
  | 'changeLayerColor'
  | 'changeLayerGradient'
  | 'changeLayerSettings'
  | 'changeLocale'
  | 'changeMiterLimit'
  | 'changePosition'
  | 'disposeLabel'
  | 'importLabelSettings'
  | 'moveLayerSettings'
  | 'switchBackground';

export type SendMessageData<T> = {
  command: SendMessageDataCommand;
  data: T;
  textOption?: string;
};
