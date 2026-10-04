<script lang="ts">
	const words = ['cozy games', 'tiny worlds', 'big feelings', 'hand-placed pixels', 'made with love'];
</script>

<div class="ticker" aria-hidden="true">
	<div class="track">
		{#each [0, 1] as copy (copy)}
			<span class="run">
				{#each words as word (word)}
					<span>{word}</span><span class="star">★</span>
				{/each}
			</span>
		{/each}
	</div>
</div>

<style>
	.ticker {
		overflow: hidden;
		background: var(--rust);
		color: var(--cream);
		border-block: var(--px) solid var(--sun-edge);
		padding: 1rem 0;
	}

	.track {
		display: flex;
		width: max-content;
		animation: scroll 32s steps(320) infinite;
	}

	.run {
		display: flex;
		gap: 1.75rem;
		padding-right: 1.75rem;
		font-family: var(--font-arcade);
		font-size: 0.7rem;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.star {
		color: var(--sky-1);
	}

	@keyframes scroll {
		to {
			transform: translateX(-50%);
		}
	}
</style>
