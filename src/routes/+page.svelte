<script lang="ts">
  import Clock from '$lib/Clock.svelte';
  import { onMount } from 'svelte';
  import { configStore } from '../stores/configStore';
	import type { ConfigStore } from '../stores/types';

  let appWindow: any
  let WebviewWindow: any;
  let config: ConfigStore;

  if (typeof window !== 'undefined') {
    import('@tauri-apps/api/window').then((module) => {
      appWindow = module.appWindow;
      WebviewWindow = module.WebviewWindow;
    });
  }
  let configWindow: typeof WebviewWindow | null = null;
  onMount(() => {
    appWindow?.listen('close-requested', () => {
      if (configWindow) {
        configWindow.close();
      }
      appWindow?.close();
    });
    const unsubscribe = configStore.subscribe(value => {
    config = value;
    console.log('Clock received new config:', config);
  });

  return unsubscribe;
  });

  function closeApp() {
    if (configWindow) {
      configWindow.close();
    }
    appWindow?.close();
  }

  function openConfigWindow() {
    configWindow = new WebviewWindow('config', {
      url: '/config',
      width: 600,
      height: 400,
      title: 'Configuration',
      resizable: true,
      decorations: true,
    });

    configWindow.once('close-requested', () => {
      configWindow.close();
    });
  }
  console.log('store inside the base route', $configStore)
</script>

<style>
  :global(.clock) {
    top: var(--top);
    left: var(--left);
  }
  :global(body){
    background: rgba(0, 0, 0, 0);
  }
</style>

<Clock
  config={config}
  openConfigWindow={openConfigWindow}
  closeApp={closeApp}
/>
<!-- <Clock
  openConfigWindow={openConfigWindow}
  closeApp={closeApp}
/> -->

