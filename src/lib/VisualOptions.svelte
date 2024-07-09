<script lang="ts">
  import { configStore, defaultConfig } from '$stores/configStore';
  import ColorSelector from '$lib/ColorSelector.svelte';
	import { updateConfig } from '$lib/utils/updateStore';
	import { dateFormats } from '$stores/constants';
	import { clockFormats } from '$stores/constants';
	import ConfigurationWrapper from '$lib/ConfigurationWrapper.svelte';

  let currentClockFormat = $configStore.clockFormat
  let currentDateFormat = $configStore.dateFormat

  let systemFonts: string[] = [];
  let isClient = typeof window !== 'undefined';

  if (isClient) {
    import('@tauri-apps/api').then(({ invoke }) => {
      async function fetchSystemFonts() {
        try {
          systemFonts = await invoke('get_system_fonts');
        } catch (error) {
          console.error('Failed to fetch system fonts', error);
        }
      }
      fetchSystemFonts();
    });
  }

</script>
<ConfigurationWrapper>
  <p>Font Family</p>
  <select
    class="select select-bordered select-sm w-full max-w-xs"
    bind:value={$configStore.fontFamily}
    on:change={(e) => updateConfig('fontFamily', e.currentTarget.value)}
  >
    {#each systemFonts as font}
      <option value={font}>{font}</option>
    {/each}
  </select>
</ConfigurationWrapper>
<ConfigurationWrapper>
  <p>Font size</p>
  <input
    type="number"
    class="w-full max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1"
    bind:value={$configStore.fontSize}
    on:change={(e) => updateConfig('fontSize', e.currentTarget.value)}
  />
</ConfigurationWrapper>

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
<ColorSelector
  label="Buttons colors"
  name="button-color"
  key="buttonColor"
  currentColor={$configStore.buttonColor}
  defaultColor={defaultConfig.buttonColor}
/>
<ColorSelector
  label="Buttons colors on hover"
  name="button-color-hover"
  key="buttonColorHover"
  currentColor={$configStore.buttonColorHover}
  defaultColor={defaultConfig.buttonColorHover}

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

<style>
  .checkbox-wrapper {
    width: 20rem;
  }
</style>