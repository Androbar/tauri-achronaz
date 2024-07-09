<script lang="ts">
  export let text: string;
</script>

<div class="relative group">
  <slot></slot>
  <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
    <div class="bg-gray-700 text-white text-sm rounded py-1 px-2">
      {text}
    </div>
    <div class="w-3 h-3 bg-gray-700 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
  </div>
</div>
