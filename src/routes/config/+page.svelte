<script lang="ts">
	import AlarmOptions from '$lib/AlarmOptions.svelte';
	import VisualOptions from '$lib/VisualOptions.svelte';

  type ConfigMenuKey = keyof typeof configMenu;

  let selectedMenu: ConfigMenuKey = 'alarm';
  // TODO: add profiles and pomodoro config
  let configMenu = {
    'alarm': AlarmOptions,
    'visuals': VisualOptions,
  }

  let setMenu = (menu:ConfigMenuKey) => {
    selectedMenu = menu
  }
</script>

<div class="config-container flex flex-col gap-1">
  <h1 class="font-bold text-2xl">Configuration</h1>
  <div class="flex w-full gap-3">
    <div class="side-menu flex flex-col text-lg gap-2">
      <div
        class={`menu-item ${selectedMenu === 'alarm' ? 'font-bold text-blue-600/100' : ''}`}
        role="button"
        tabindex={0}
        on:click={() => setMenu('alarm')}
        on:keypress={() =>setMenu('alarm')}
      >
        Alarm
      </div>
      <div
        class={`menu-item ${selectedMenu === 'visuals' ? 'font-bold text-blue-600/100' : ''}`}
        role="button"
        tabindex={0}
        on:click={() => setMenu('visuals')}
        on:keypress={() =>setMenu('visuals')}
      >
        Visuals
      </div>
    </div>
    <div class="flex flex-col gap-2">
      {#key selectedMenu}
        {#if configMenu[selectedMenu]}
          <svelte:component this={configMenu[selectedMenu]} />
        {/if}
      {/key}
    </div>
  </div>
</div>

<style>
  h1 {
    margin-bottom: 10px;
  }
  .config-container {
    max-width: 720px;
    margin: 0 auto;
    border: 1px solid black;
    padding: 15px;
    border-radius: 5px;
  }
  .side-menu {  
    border-right: 1px solid;
    border-color: var(--fallback-bc,oklch(var(--bc)/0.2));
    min-width: 8rem;
  }
  .menu-item {
    transition: all 0.2s ease;
  }
  .menu-item:hover {
    font-weight: bolder;
  }

</style>