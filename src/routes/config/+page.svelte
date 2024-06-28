<script lang="ts">
  // Add your configuration logic here
</script>

<style>
  h1 {
    font-family: Arial, sans-serif;
  }
</style>

<div>
  <h1>Configuration</h1>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Background color</p>
    <input type="text" placeholder="#fff" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Font color</p>
    <input type="text" placeholder="#000" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Alarm Time</p>
    <input type="time" placeholder="#000" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Alarm Bg color</p>
    <input type="text" placeholder="#000" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Alarm Font color</p>
    <input type="text" placeholder="#000" class="input input-bordered input-sm w-full max-w-xs" />
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Clock time format</p>
    <select class="select select-bordered select-sm w-full max-w-xs">
      <option selected>HH:MM:SS AM/PM</option>
      <option>HH:MM:SS 24H</option>
      <option>HH:MM AM/PM</option>
      <option>HH:MM 24H</option>
    </select>
  </div>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Show date</span>
      <input type="checkbox" checked={null} class="checkbox checkbox-info" />
    </label>
  </div>
  <div class="flex flex-row gap-x-6 justify-items-center content-center">
    <p>Date format</p>
    <select class="select select-bordered select-sm w-full max-w-xs">
      <option selected>DD/MM/YYYY</option>
      <option>DD/MM/YY</option>
      <option>MM/DD/YYYY</option>
      <option>MM/DD/YY</option>
    </select>
  </div>
</div>
