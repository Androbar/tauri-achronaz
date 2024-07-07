<script lang="ts">
  export let labelElement: HTMLLabelElement;
  export let label: string;
  export let hex: string;
  export let name: string | undefined = undefined;
  /* svelte-ignore unused-export-let /** indicator of the popup state */
  export let isOpen: boolean;

  function noop() {
		/* prevent browser color picker from opening unless javascript is broken */
	}

</script>

<label bind:this={labelElement} class="input-bordered">
	<div class="container">
		<input
			type="color"
			{name}
			value={hex}
			on:click|preventDefault={noop}
			on:mousedown|preventDefault={noop}
      on:keydown|preventDefault={noop}
			aria-haspopup="dialog"
		/>
		<div class="alpha" />
		<div class="color" style:background={hex} />
	</div>
  {label}
</label>

<style>
  label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		border-radius: 5px;
		height: var(--input-size, 27px);
		user-select: none;
    width: 320px;
		border: 1px solid;
		border-color: var(--fallback-bc,oklch(var(--bc)/0.2));
	}

	.container {
		position: relative;
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	input {
		margin: 0;
		padding: 0;
		border: none;
		width: 1px;
		height: 1px;
		flex-shrink: 0;
		opacity: 0;
	}

	.alpha {
		/* clip-path: circle(50%); */
		background: var(--alpha-grid-bg);
	}

	.alpha,
	.color {
		position: absolute;
		width: 100%;
		height: var(--input-size, 25px);
		border-radius: 5px;
		user-select: none;
	}

	input:focus-visible ~ .color {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>