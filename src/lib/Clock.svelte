<script lang="ts">
  import { onMount } from 'svelte';
  let appWindow: any
  let WebviewWindow: any;
  if (typeof window !== 'undefined') {
    import('@tauri-apps/api/window').then((module) => {
      appWindow = module.appWindow;
      WebviewWindow = module.WebviewWindow;
    });
  }
  let configWindow: typeof WebviewWindow | null = null;
  let time: Date = new Date();
  let alarmTime: string = '';
  let alarmActive: boolean = false;
  let alarmTriggered: boolean = false;
  let clockOpen: boolean = false;

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
      if (alarmActive && time.toLocaleTimeString() === alarmTime) {
        alarmTriggered = true;
      }
    }, 1000);

    appWindow?.listen('close-requested', () => {
      if (configWindow) {
        configWindow.close();
      }
      appWindow?.close();
    });

    return () => clearInterval(interval);
  });

  function closeApp() {
    if (configWindow) {
      configWindow.close();
    }
    appWindow?.close();
    console.log('bop')
  }

  function openConfigWindow() {
    console.log('bep')
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

<div class="clock-container" role="application" on:mouseenter={() => clockOpen=true} on:mouseleave={() => clockOpen=false}>
  <!-- <button class="close-app close-app bg-gray-700 text-white rounded p-2 m-2" on:click={()=> closeApp()}>close</button> -->
  <div class="close-app">
    <button class="btn btn-circle btn-outline btn-xs" on:click={()=> closeApp()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  <div class="clock">
    {time.toLocaleTimeString()}
  </div>
  <button class="open-configuration btn btn-info btn-active btn-sm" on:click={()=> openConfigWindow()}>Configuration</button>

</div>

<div style='--clock-background: red'></div>

<style>
  .close-app {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    opacity: 0;
    transition: all 1.5s ease;
    height: 20px;
    width: 20px;
  }
  .clock-container:hover .close-app {
    opacity: 1;
  }
  .clock-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 24px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.6);
    padding: 10px;
    border-radius: 20px;
    z-index: 10000;
    width: 200px;
    height: 60px;
    transition: all 1.5s ease;
  }
  .clock-container:hover {
    cursor: default;
    width: 200px;
    height: 70px;
    background: rgba(255, 255, 255, 1);
  }
  .open-configuration{
    opacity: 0;
    transition: all 1.5s ease;
    height: 0;
    min-height: 0;
    color: white;
  }
  .clock-container:hover .open-configuration{
    opacity: 1;
    height: auto;
    min-height: 2rem;

  }
</style>