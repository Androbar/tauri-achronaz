<script lang="ts">
  import { onMount } from 'svelte';
	import type { ConfigStore } from '../stores/types';

  export let openConfigWindow: () => void
  export let closeApp: () => void
  export let config: ConfigStore | null;
  
  let clockOpen: boolean = false;
  let time: Date = new Date();
  let alarmTriggered: boolean = false;

  onMount(() => {
    if(!config) return
    const interval = setInterval(() => {
      time = new Date();
      if (config.alarmTime && time.toLocaleTimeString() === config.alarmTime) {
        alarmTriggered = true;
      }
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div style="--clock-background: {config?.backgroundColor};
            --clock-background-hover: {config?.backgroundHoverColor};
            --clock-font-color: {config?.fontColor};
            --clock-font-color-hover: {config?.fontColor};
            --alarm-background: {config?.alarmBgColor};
            --alarm-font-color: {config?.alarmFontColor}"
>
  <div
    class="clock-container"
    role="application"
    on:mouseenter={() => {
      clockOpen=true
      console.log(config)
    }}
    on:mouseleave={() => clockOpen=false}
    style={`background: ${config?.backgroundColor}`}
  >
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
</div>

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
    background: var(--clock-background-hover);
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