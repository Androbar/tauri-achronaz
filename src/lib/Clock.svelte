<script lang="ts">
  import { onMount } from 'svelte';

  let time: Date = new Date();
  let alarmTime: string = '';
  let alarmActive: boolean = false;
  let alarmTriggered: boolean = false;

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
      if (alarmActive && time.toLocaleTimeString() === alarmTime) {
        alarmTriggered = true;
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  // function setAlarm() {
  //   alarmActive = true;
  //   alarmTriggered = false;
  // }
</script>

<div class="clock">
  {time.toLocaleTimeString()}
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
  .clock {
    position: fixed;
    top: var(--top, 10px);
    left: var(--left, 10px);
    font-size: 24px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.6);
    padding: 10px;
    border-radius: 20px;
    z-index: 10000;
  }
</style>