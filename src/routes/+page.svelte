<script lang="ts">
  import Clock from '$lib/Clock.svelte';
  import type { SvelteComponent } from 'svelte';


  let clock: SvelteComponent;
</script>

<style>
  :global(.clock) {
    top: var(--top);
    left: var(--left);
  }
  :global(body){
    background: rgba(0, 0, 0, 0);
  }
</style>

<Clock bind:this={clock} />

