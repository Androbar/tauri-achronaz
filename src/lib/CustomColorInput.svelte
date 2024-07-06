<script lang="ts">
  export let labelElement: HTMLLabelElement;
  export let label: string;
  export let isOpen: boolean;
  export let hex: string;
  export let name: string | undefined = undefined;

  function handleOpen() {
    isOpen = !isOpen;
  }
  function noop() {
		/* prevent browser color picker from opening unless javascript is broken */
	}

</script>

<label bind:this={labelElement}>
	<div class="container">
		<input
			type="color"
			{name}
			value={hex}
			on:click|preventDefault={noop}
			on:mousedown|preventDefault={noop}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOpen()
        }
      }}
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
		border-radius: 3px;
		margin: 4px;
		height: var(--input-size, 25px);
		user-select: none;
    width: 100%;
    max-width: 20rem;
    min-width: 20rem;
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