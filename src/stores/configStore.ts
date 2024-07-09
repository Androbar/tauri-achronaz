import { writable } from 'svelte/store';
import type { ConfigStore } from './types';


export const defaultConfig = {
  backgroundColor: '#ffffff99',
  backgroundHoverColor: '#ffffffff',
  fontColor: '#000',
  fontHoverColor: '#000',
  alarmBgColor: 'red',
  alarmFontColor: '#fff',
  clockFormat: 'HH:MM:SS AM/PM' as const,
  dateFormat: 'DD/MM/YYYY' as const,
  showDate: false,
  alarmTime: null,
  fontFamily: 'Arial, sans-serif',
  fontSize: 44,
  buttonColor: "#2563EB",
  buttonColorHover: "#1E3A8A"
}

const storedConfig: ConfigStore | null  = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem('clockConfig') || 'null')
  : null;

export const configStore = writable<ConfigStore>(storedConfig || defaultConfig);

configStore.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('clockConfig', JSON.stringify(value));
  }
});