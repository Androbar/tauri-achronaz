<script lang="ts">
  import { configStore } from '$stores/configStore';
  import ColorSelector from '$lib/ColorSelector.svelte';
	import { updateConfig } from '$lib/utils/updateStore';
	import { dateFormats } from '$stores/constants';
	import { clockFormats } from '$stores/constants';
	import ConfigurationWrapper from '$lib/ConfigurationWrapper.svelte';
  // import { debounce } from 'lodash-es';
  // TODO: Implement debounce fo update config

  let currentClockFormat = $configStore.clockFormat
  let currentDateFormat = $configStore.dateFormat
</script>

<div class="config-container flex flex-col gap-1">
  <h1>Configuration</h1>
  <ColorSelector
    label="Background color"
    name="background-color"
    key="backgroundColor"
    currentColor={$configStore.backgroundColor}
  />
  <ColorSelector
    label="Font color"
    name="font-color"
    key="fontColor"
    currentColor={$configStore.fontColor}
  />
  <ColorSelector
    label="Background color on hover"
    name="background-color-hover"
    key="backgroundHoverColor"
    currentColor={$configStore.backgroundHoverColor}
  />
  <ColorSelector
    label="Font color on hover"
    name="font-color-hover"
    key="fontHoverColor"
    currentColor={$configStore.fontHoverColor}
  />
  <ConfigurationWrapper>
    <p>Alarm Time</p>
    <input
      type="time"
      class="input input-bordered input-sm w-full max-w-xs"
      bind:value={$configStore.alarmTime}
      on:change={(e) => updateConfig('alarmTime', e.currentTarget.value)}
    />
  </ConfigurationWrapper>
  <ColorSelector
    label="Alarm Bg color"
    name="alarm-background-color"
    key="alarmBgColor"
    currentColor={$configStore.alarmBgColor}
  />
  <ColorSelector
    label="Alarm Font color"
    name="alarm-font-color"
    key="alarmFontColor"
    currentColor={$configStore.alarmFontColor}
  />

  <ConfigurationWrapper>
    <p>Clock time format</p>
    <select
      class="select select-bordered select-sm w-full max-w-xs"
      bind:value={$configStore.clockFormat}
      on:change={(e) => updateConfig('clockFormat', e.currentTarget.value)}
    >
      {#each clockFormats as format}
        {#if format === currentClockFormat}
        <option selected>{format}</option>
        {:else}
        <option>{format}</option>
        {/if}
      {/each}
    </select>
  </ConfigurationWrapper>
  <ConfigurationWrapper>
    <p>Show date</p>
    <div class="w-full flex items-center checkbox-wrapper">
      <input
        type="checkbox"
        class="checkbox checkbox-info"
        bind:checked={$configStore.showDate}
        on:click={(e) => updateConfig('showDate', !$configStore.showDate)}
        />
    </div>
  </ConfigurationWrapper>
  <ConfigurationWrapper>
    <p class="config-label">Date format</p>
    <select
      class="config-picker select select-bordered select-sm w-full max-w-xs"
      bind:value={$configStore.dateFormat}
      on:change={(e) => updateConfig('dateFormat', e.currentTarget.value)}
    >
      {#each dateFormats as format}
        {#if format === currentDateFormat}
        <option selected>{format}</option>
        {:else}
        <option>{format}</option>
        {/if}
      {/each}
    </select>
  </ConfigurationWrapper>
</div>

<style>
  .config-container {
    max-width: 720px;
    margin: 0 auto;
    /* border: 1px solid black; */
    padding: 15px;
    border-radius: 5px;
  }
  .checkbox-wrapper {
    width: 20rem;
  }
</style>