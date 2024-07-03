import { configStore } from './configStore';

import type { ConfigStore } from './types';

let broadcastChannel: BroadcastChannel | undefined;

if (typeof window !== 'undefined') {
  broadcastChannel = new BroadcastChannel('clockConfig');
  
  broadcastChannel.onmessage = (event: MessageEvent<ConfigStore>) => {
    configStore.set(event.data);
  };

  configStore.subscribe(value => {
    broadcastChannel?.postMessage(value);
  });
}