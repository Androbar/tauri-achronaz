<script lang="ts">
  import { onMount } from 'svelte';
	import type { ConfigStore } from '../stores/types';
  import { format } from 'date-fns';
  import type { ClockFormat } from '$stores/types'
	import { formatDate, formatTime } from './utils/datetime';
  export let openConfigWindow: () => void
  export let closeApp: () => void
  export let config: ConfigStore | null;
  
  let clockOpen: boolean = false;
  let time: string;
  let formattedDate: string;
  let alarmTriggered: boolean = false;

  onMount(() => {
  const updateTime = () => {
    const now = new Date();
    time = formatTime(now, config?.clockFormat);
    if (config?.showDate) {
      formattedDate = formatDate(now, config.dateFormat);
    }

    if (config && config.alarmTime && time.startsWith(config.alarmTime)) {
      alarmTriggered = true;
    }
  };

  updateTime();
  const interval = setInterval(updateTime, 1000);
  return () => clearInterval(interval);
});

</script>

<div style="--clock-background: {config?.backgroundColor};
            --clock-background-hover: {config?.backgroundHoverColor};
            --clock-font-color: {config?.fontColor};
            --clock-font-color-hover: {config?.fontHoverColor};
            --alarm-background: {config?.alarmBgColor};
            --alarm-font-color: {config?.alarmFontColor}"
>
  <div
    class={`clock-container ${alarmTriggered ? 'alarm' : ''}`}
    role="application"
    on:mouseenter={() => clockOpen=true}
    on:mouseleave={() => clockOpen=false}
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
    <div class={`clock ${alarmTriggered ? 'alarm' : ''}`}>
      {time}
    </div>
    {#if config?.showDate}
      <div class="date">
        {formattedDate}
      </div>
    {/if}
    {#if alarmTriggered}
      <button
        class="open-configuration btn btn-info btn-active btn-sm"
        on:click={()=> {alarmTriggered = false}}>Stop Alarm
      </button>
    {:else}
      <button
        class="open-configuration btn btn-info btn-active btn-sm"
        on:click={()=> openConfigWindow()}>Configuration
      </button>
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
  .date {
    font-size: smaller
  }
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
    align-items: center;
    background: var(--clock-background);
    border-radius: 20px;
    color: var(--clock-font-color);
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-weight: bold;
    height: 60px;
    justify-content: center;
    padding: 10px;
    position: relative;
    transition: all 1.5s ease;
    transition: background-color 1s, color 1s;
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