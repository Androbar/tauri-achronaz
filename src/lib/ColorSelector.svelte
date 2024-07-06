<script lang="ts">
	import ColorPicker from "svelte-awesome-color-picker";
	import CustomColorInput from "./CustomColorInput.svelte";
	import type { ConfigStore } from "../stores/types";
	import { updateConfig } from "./utils/updateStore";

  export let label: string;
  export let name: string | undefined = undefined;
  export let key: keyof ConfigStore;
  export let currentColor: string;
  export let defaultColor: string = '#ffffff'

  let hex = currentColor;
</script>

<div class="flex flex-row gap-x-6 justify-items-center content-center">
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
</div>