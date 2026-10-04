<script lang="ts">
	import PixelFrame from './PixelFrame.svelte';

	let email = $state('');
	let saved = $state(false);

	function save(e: SubmitEvent) {
		e.preventDefault();
		// TODO: send `email` to the newsletter provider.
		saved = true;
	}
</script>

<section id="contact" class="contact">
	<div class="container">
		<PixelFrame fill="var(--sky-2)" shadow="var(--rust)">
			<div class="card">
				<div class="text">
					<p class="eyebrow">Save point reached</p>
					<h2 class="section-title">Save your progress</h2>
					<p>
						Get the occasional letter from the studio: devlogs, early builds and the odd doodle. No
						spam, ever — just the good stuff.
					</p>
				</div>

				{#if saved}
					<p class="saved" role="status">★ Progress saved! See you soon. ★</p>
				{:else}
					<form onsubmit={save}>
						<label class="sr-only" for="email">Email address</label>
						<input
							id="email"
							type="email"
							required
							autocomplete="email"
							placeholder="you@example.com"
							bind:value={email}
						/>
						<button class="btn" type="submit" style="--btn-bg: var(--bg); --btn-fg: var(--cream); --btn-shadow: var(--night)">
							Save ▶
						</button>
					</form>
				{/if}
			</div>
		</PixelFrame>
	</div>
</section>

<style>
	.contact {
		padding: clamp(4rem, 9vw, 7rem) 0;
	}

	.card {
		display: grid;
		gap: 2rem;
		padding: clamp(1.75rem, 5vw, 3.5rem);
		color: var(--bg);
	}

	@media (min-width: 900px) {
		.card {
			grid-template-columns: 1.2fr 1fr;
			align-items: end;
			column-gap: 4rem;
		}
	}

	.text p:not(.eyebrow) {
		margin: 0;
		max-width: 48ch;
	}

	.eyebrow {
		color: var(--rust);
	}

	h2 {
		text-shadow: calc(var(--px) * -1) var(--px) 0 var(--sky-1);
	}

	form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	input {
		flex: 1 1 220px;
		min-width: 0;
		padding: 1rem 1.1rem;
		font: inherit;
		font-size: 1.05rem;
		color: var(--bg);
		background: var(--sky-1);
		border: var(--px) solid var(--bg);
		border-radius: 0;
	}

	input::placeholder {
		color: var(--sun-edge);
	}

	input:focus-visible {
		outline: var(--px) solid var(--rust);
		outline-offset: 0;
	}

	.saved {
		margin: 0;
		padding: 1.1rem;
		font-family: var(--font-arcade);
		font-size: 0.65rem;
		line-height: 1.8;
		text-align: center;
		color: var(--cream);
		background: var(--bg);
	}

</style>
