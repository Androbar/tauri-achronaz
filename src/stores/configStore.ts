import { writable } from 'svelte/store';
import type { ConfigStore } from './types';


const defaultConfig = {
  backgroundColor: '#ffffff99',
  backgroundHoverColor: '#ffffffff',
  fontColor: '#000',
  fontHoverColor: '#000',
  alarmBgColor: 'red',
  alarmFontColor: '#fff',
  clockFormat: 'HH:MM:SS AM/PM',
  dateFormat: 'DD/MM/YYYY',
  showDate: false,
  alarmTime: null,
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