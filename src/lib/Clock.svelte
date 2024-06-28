<script lang="ts">
  // import { WebviewWindow } from '@tauri-apps/api/window';
  import { onMount } from 'svelte';
  let appWindow: any
  let WebviewWindow: any;
  if (typeof window !== 'undefined') {
    // Only import @tauri-apps/api/window in the browser context
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

  // function setAlarm() {
  //   alarmActive = true;
  //   alarmTriggered = false;
  // }

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
  <button class="close-app close-app bg-gray-700 text-white rounded p-2 m-2" on:click={()=> closeApp()}>close</button>
  <div class="clock">
    {time.toLocaleTimeString()}
  </div>
  <button class="open-configuration" on:click={()=> openConfigWindow()}>conf</button>

</div>

<!-- <div>
  <label>
    Alarm Time (HH:MM:SS):
    <input type="text" bind:value={alarmTime} />
  </label>
  <button on:click={setAlarm}>Set Alarm</button>
</div> -->

<!-- <div style='--clock-background:{alarmTriggered ? 'red' : 'rgba(255, 255, 255, 0.8)'};'></div> -->
<div style='--clock-background: red'></div>

<style>
  .close-app {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    opacity: 0;
    transition: all 1.5s ease;
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
  }
  .clock-container:hover .open-configuration{
    opacity: 1;
    height: auto;
  }
</style>