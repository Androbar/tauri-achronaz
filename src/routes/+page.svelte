<script lang="ts">
  import Clock from '$lib/Clock.svelte';
  import { onMount } from 'svelte';
  import { configStore } from '../stores/configStore';

  let appWindow: any
  let WebviewWindow: any;

  if (typeof window !== 'undefined') {
    import('@tauri-apps/api/window').then((module) => {
      appWindow = module.appWindow;
      WebviewWindow = module.WebviewWindow;
    });
  }
  let configWindow: typeof WebviewWindow | null = null;
  onMount(() => {
    console.log('config dfrom store: ', $configStore)
    appWindow?.listen('close-requested', () => {
      if (configWindow) {
        configWindow.close();
      }
      appWindow?.close();
    });
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
  config={$configStore}
  openConfigWindow={openConfigWindow}
  closeApp={closeApp}
/>
<!-- <Clock
  openConfigWindow={openConfigWindow}
  closeApp={closeApp}
/> -->

