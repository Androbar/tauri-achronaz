<script lang="ts">
  import Clock from '$lib/Clock.svelte';
  import { onMount } from 'svelte';
  import { configStore } from '../stores/configStore';
	import type { ConfigStore } from '../stores/types';
  import { register, unregister } from '@tauri-apps/api/globalShortcut';

  let appWindow: any
  let WebviewWindow: any;
  let config: ConfigStore;
  let isVisible = true;
  let PhysicalSize: any;

  if (typeof window !== 'undefined') {
    import('@tauri-apps/api/window').then((module) => {
      appWindow = module.appWindow;
      WebviewWindow = module.WebviewWindow;
      PhysicalSize = module.PhysicalSize
    });
  }

  let configWindow: typeof WebviewWindow | null = null;

  async function enableMoveMode() {
    await appWindow.startDragging();
  }
  async function registerShortcut() {
    try {
      await register('CommandOrControl+Shift+H', async () => {
        if (isVisible) {
          await hideClock();
        } else {
          await showClock();
        }
      });
    } catch (error) {
      console.error('Error registering shortcut:', error);
    }
  }

  onMount(() => {
    appWindow?.listen('close-requested', () => {
      if (configWindow) {
        configWindow.close();
      }
      appWindow?.close();
    });

    const unsubscribe = configStore.subscribe(value => {
      config = value;
    });

    registerShortcut()

    return () => {
      unregister('CommandOrControl+Shift+H');
      unsubscribe();
    };
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
      width: 850,
      height: 450,
      title: 'Configuration',
      resizable: true,
      decorations: true,
    });

    configWindow.once('close-requested', () => {
      configWindow.close();
    });
  }
  console.log('store inside the base route', $configStore)
  async function showClock() {
    isVisible = true;
    await appWindow.setSize(new PhysicalSize(280, 80));
    await appWindow.show();
  }

  async function hideClock() {
    isVisible = false;
    await appWindow.hide();
  }
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
  enableMoveMode={enableMoveMode}
/>