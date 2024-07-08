<script>
  import "../app.css";
  import { browser } from '$app/environment';
	import { onMount } from "svelte";
  import 'iconify-icon'

  export const prerender = true
  export const ssr = false;

  onMount(() => {
    if (browser) {
      import('../stores/broadcastChannel').then(() => {
        console.log('Broadcast channel module loaded');
      });
    }
  });
</script>
<slot />