<script lang="ts">
  import { configStore } from '$stores/configStore';
  import ColorSelector from '$lib/ColorSelector.svelte';
	import { updateConfig } from '$lib/utils/updateStore';
	import ConfigurationWrapper from '$lib/ConfigurationWrapper.svelte';
</script>

<ConfigurationWrapper>
  <p>Alarm Time</p>
  <input
    type="time"
    class="input input-bordered input-sm w-full max-w-xs"
    bind:value={$configStore.alarmTime}
    on:change={(e) => updateConfig('alarmTime', e.currentTarget.value)}
  />
</ConfigurationWrapper>
<ConfigurationWrapper>
  <p>Sooze duration (minutes)</p>
  <input
    type="number"
    class="w-full max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1"
    bind:value={$configStore.snoozeDuration}
    on:change={(e) => updateConfig('snoozeDuration', e.currentTarget.value)}
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
