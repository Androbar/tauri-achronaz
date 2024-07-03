<script>
  import "../app.css";
  import { browser } from '$app/environment';

  if (browser) {
    import('../stores/broadcastChannel');
  }
</script>
<slot />