<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import CustomColorInput from "./CustomColorInput.svelte";
	import type { ConfigStore } from "../stores/types";
	import { updateConfig } from "./utils/updateStore";
	import ConfigurationWrapper from "./ConfigurationWrapper.svelte";

  export let label: string;
  export let name: string | undefined = undefined;
  export let key: keyof ConfigStore;
  export let currentColor: string;
  export let defaultColor: string = '#ffffff'

  let hex = currentColor;
</script>

<ConfigurationWrapper>
  <p>{label}</p>
  <ColorPicker
    label=""
    name={name}
    bind:hex
    on:input={(e) => {
      updateConfig(key, e.detail.hex || defaultColor)
    }}
    components={{ input: CustomColorInput }}
  />
</ConfigurationWrapper>