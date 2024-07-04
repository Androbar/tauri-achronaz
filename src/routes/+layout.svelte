<script>
  import "../app.css";
  import { browser } from '$app/environment';
	import { onMount } from "svelte";

  onMount(() => {
    if (browser) {
      import('../stores/broadcastChannel').then(() => {
        console.log('Broadcast channel module loaded');
      });
    }
  });
</script>
<slot />