<script lang="ts">
  import { onMount } from 'svelte';
	import type { ConfigStore } from '../stores/types';
	import { formatDate, formatTime } from './utils/datetime';
  import { defaultConfig } from '$stores/configStore';

  export let openConfigWindow: () => void;
  export let closeApp: () => void;
  export let enableMoveMode: () => void;
  export let config: ConfigStore | null;
  
  let clockOpen: boolean = false;
  let time: string;
  let formattedDate: string;
  let alarmTriggered: boolean = true;
  let alarmFormatTime: string;

  onMount(() => {
  const updateTime = () => {
    const now = new Date();
    time = formatTime(now, config?.clockFormat);
    alarmFormatTime = formatTime(now, 'HH:MM:SS 24H')
    if (config?.showDate) {
      formattedDate = formatDate(now, config.dateFormat);
    }
    
    if (config && config.alarmTime && alarmFormatTime === `${config.alarmTime}:00`) {
      alarmTriggered = true;
    }
  };

  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
});

const snoozeAlarm = () => {
  alarmTriggered = false;
  const snoozeDuration = config?.snoozeDuration || defaultConfig.snoozeDuration;
  setTimeout(() => {
    alarmTriggered = true;
  }, snoozeDuration * 60 * 1000); // Convert snoozeDuration from minutes to milliseconds
};

</script>

<div style="--clock-background: {config?.backgroundColor || defaultConfig.backgroundColor};
            --clock-background-hover: {config?.backgroundHoverColor || defaultConfig.backgroundHoverColor};
            --clock-font-color: {config?.fontColor || defaultConfig.fontColor};
            --clock-font-color-hover: {config?.fontHoverColor || defaultConfig.fontHoverColor};
            --alarm-background: {config?.alarmBgColor || defaultConfig.alarmBgColor};
            --alarm-font-color: {config?.alarmFontColor || defaultConfig.alarmFontColor};
            --clock-font: {config?.fontFamily || defaultConfig.fontFamily};
            --clock-font-size: {config?.fontSize || defaultConfig.fontSize}px;
            --button-color: {config?.buttonColor || defaultConfig.buttonColor};
            --button-color-hover: {config?.buttonColorHover || defaultConfig.buttonColorHover};"
>
  <div
    class={`clock-container ${alarmTriggered ? 'alarm' : ''}`}
    role="application"
    on:mouseenter={() => clockOpen=true}
    on:mouseleave={() => clockOpen=false}
  >
    <div class="close-app">
      <button class="" on:click={()=> closeApp()}>
        <iconify-icon icon="ci:close-square" width="34" height="34"></iconify-icon>
      </button>
    </div>
    <div class={`clock ${alarmTriggered ? 'alarm' : ''}`}>
      {time}
    </div>
    {#if config?.showDate}
      <div class="date">
        {formattedDate}
      </div>
    {/if}
    {#if alarmTriggered}
      <div class="flex gap-1">
        <button
          class="open-configuration btn btn-sm border-transparent hover:border-transparent bg-red-600 hover:bg-red-900"
          on:click={()=> {alarmTriggered = false}}>
          <iconify-icon icon="clarity:alarm-off-line" width="22" height="22"></iconify-icon>
        </button>
        <button
          class="open-configuration btn btn-sm border-transparent hover:border-transparent bg-yellow-600 hover:bg-yellow-900"
          on:click={snoozeAlarm}>
          <iconify-icon icon="ic:sharp-snooze" width="22" height="22"></iconify-icon>
        </button>
      </div>
    {:else}
      <div class="flex gap-1">
        <button
          data-tauri-drag-region
          class="open-configuration btn btn-sm border-transparent hover:border-transparent"
          on:click={()=> enableMoveMode()}>
          <div class="drag-wraper icon">
            <div class="transparent-drag-overlay" data-tauri-drag-region></div>
            <div class="icon icon-background" data-tauri-drag-region>
              <iconify-icon icon="carbon:move" width="22" height="22"></iconify-icon>
            </div>
          </div>
        </button>
        <button
          class="open-configuration btn btn-sm border-transparent hover:border-transparent"
          on:click={()=> openConfigWindow()}>
            <iconify-icon icon="mdi:gear" width="22" height="22"></iconify-icon>
        </button>
      </div>

    {/if}
  </div>
</div>

<style>
  @keyframes backgroundTransition {
    0% {
      background: var(--clock-background);
      color: var(--clock-font-color);
    }
    50% {
      background: var(--alarm-background);
      color: var(--alarm-font-color);
    }
    100% {
      background: var(--clock-background);
      color: var(--clock-font-color);
    }
  }
  .icon {
    color: #fff;
    width: 22px;
    height: 22px;
  }
  .drag-wraper {
    position: relative;
  }
  .transparent-drag-overlay {
    position: absolute;
    background: transparent;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .icon-background {
    position: absolute;

  }
  .date {
    font-size: smaller
  }
  .close-app {
    position: absolute;
    top: 5px;
    right: 19px;
    transform: translate(50%, -50%);
    opacity: 0;
    transition: all 0.5s ease;
    height: 20px;
    width: 20px;
    color: var(--button-color);
  }
  .close-app:hover {
    color: var(--button-color-hover)
  }
  .clock-container:hover .close-app {
    opacity: 1;
  }
  .clock-container {
    align-items: center;
    background: var(--clock-background);
    border-radius: 5px;
    color: var(--clock-font-color);
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-weight: bold;
    height: 60px;
    justify-content: center;
    padding: 10px;
    position: relative;
    transition: all 0.5s ease;
    /* transition: background-color 1s, color 1s; */
    width: 200px;
    z-index: 10000;
  }
  .clock-container:hover {
    background: var(--clock-background-hover);
    color: var(--clock-font-color-hover);
    cursor: default;
    height: 70px;
    width: 200px;
  }
  .clock-container.alarm {
    animation-name: backgroundTransition;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
  }
  .open-configuration{
    opacity: 0;
    transition: all 0.5s ease;
    height: 0;
    min-height: 0;
    color: white;
    background-color: var(--button-color);
  }
  .clock-container:hover .open-configuration{
    opacity: 1;
    height: auto;
    min-height: 2rem;
  }
  .open-configuration:hover{
    background-color: var(--button-color-hover);
  }
  .clock {
    font-family: var(--clock-font);
    font-size: var(--clock-font-size);
  }
</style>