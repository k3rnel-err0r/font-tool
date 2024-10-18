import { SendMessageData } from '../types/MessageData';

export default function sendMessage(data: SendMessageData<unknown>) {
  if (window.opener) {
    window.opener.postMessage(JSON.stringify(data), '*');
  }
}