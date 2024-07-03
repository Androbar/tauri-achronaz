<script lang="ts">
  // Add your configuration logic here
  import { configStore } from '../../stores/configStore';

  function updateConfig(key: string, value: any) {
    configStore.update(current => ({ ...current, [key]: value }));
  }

  let clockFormats = [
    "HH:MM:SS AM/PM",
    "HH:MM:SS 24H",
    "HH:MM AM/PM",
    "HH:MM 24H",
  ]
  let dateFormats = [
    "DD/MM/YYYY",
    "DD/MM/YY",
    "MM/DD/YYYY",
    "MM/DD/YY",
  ]
  let defaultClockFormat = clockFormats[0]
  let defaultDateFormat = dateFormats[0]
</script>

<div>
  <h1>Configuration</h1>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Background color</p>
    <input
      type="color"
      placeholder="#fff"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={$configStore.backgroundColor}
      on:input={(e) => {
        console.log(e.currentTarget.value)
        updateConfig('backgroundColor', e.currentTarget.value)
        console.log('config, ', $configStore)
      }}
    />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Font color</p>
    <input
      type="color"
      placeholder="#000"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={$configStore.fontColor}
      on:input={(e) => updateConfig('fontColor', e.currentTarget.value)}
    />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Background color on hover</p>
    <input
      type="color"
      placeholder="#fff"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={$configStore.backgroundHoverColor}
      on:input={(e) => updateConfig('backgroundHoverColor', e.currentTarget.value)}
    />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Font color on hover</p>
    <input
      type="color"
      placeholder="#000"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={$configStore.fontHoverColor}
      on:input={(e) => updateConfig('fontHoverColor', e.currentTarget.value)}
    />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Alarm Time</p>
    <input
      type="time"
      placeholder="#000"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={$configStore.alarmTime}
      on:change={(e) => updateConfig('alarmTime', e.currentTarget.value)}
    />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Alarm Bg color</p>
    <input type="text" placeholder="#000" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Alarm Font color</p>
    <input type="text" placeholder="#000" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Clock time format</p>
    <select class="select select-bordered select-sm w-full max-w-xs">
      {#each clockFormats as format}
        {#if format === defaultClockFormat}
        <option selected>{format}</option>
        {:else}
        <option>{format}</option>
        {/if}
      {/each}
    </select>
  </div>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Show date</span>
      <input type="checkbox" checked={null} class="checkbox checkbox-info" />
    </label>
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Date format</p>
    <select class="select select-bordered select-sm w-full max-w-xs">
      {#each dateFormats as format}
        {#if format === defaultDateFormat}
        <option selected>{format}</option>
        {:else}
        <option>{format}</option>
        {/if}
      {/each}
    </select>
  </div>
</div>
