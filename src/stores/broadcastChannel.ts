import { configStore } from './configStore';
import type { ConfigStore } from './types';
import { emit, listen } from '@tauri-apps/api/event';

const CHANNEL_NAME = 'clock-config-update';
let isUpdatingFromEvent = false;

if (typeof window !== 'undefined') {
  // Listen for configuration updates
  listen(CHANNEL_NAME, (event: { payload: ConfigStore }) => {
    console.log('Received configuration update:', event.payload);
    if (!isUpdatingFromEvent) {
      isUpdatingFromEvent = true;
      configStore.set(event.payload);
      isUpdatingFromEvent = false;
    }
  });

  // Broadcast configuration updates
  configStore.subscribe(value => {
    if (!isUpdatingFromEvent) {
      console.log('Broadcasting configuration update:', value);
      emit(CHANNEL_NAME, value);
    }
  });
}