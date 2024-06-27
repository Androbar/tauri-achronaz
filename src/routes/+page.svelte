<script lang="ts">
  import Clock from '$lib/Clock.svelte';
  // import { writable } from 'svelte/store';
  import type { SvelteComponent } from 'svelte';

  interface Position {
    top: string;
    left: string;
  }

  // const position = writable<Position>({ top: '10px', left: '10px' });

  // function updatePosition(e: Event) {
  //   const target = e.target as HTMLInputElement;
  //   const { name, value } = target;
  //   position.update(pos => ({ ...pos, [name]: value + 'px' }));
  // }
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

<!-- <div>
  <label>
    Top:
    <input type="number" name="top" on:input={updatePosition} />
  </label>
  <label>
    Left:
    <input type="number" name="left" on:input={updatePosition} />
  </label>
</div> -->
