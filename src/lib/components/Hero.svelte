<script lang="ts">
	import PixelFrame from './PixelFrame.svelte';
	import PixelScene from './PixelScene.svelte';
</script>

<section class="hero">
	<div class="container">
		<div class="copy">
			<p class="eyebrow">★ An indie game studio ★</p>
			<h1 class="pixel-shadow">Tiny worlds,<br />big feelings.</h1>
			<p class="lede">
				We make cozy, whimsical games for people who like to slow down and smile — one little pixel
				at a time.
			</p>
			<div class="ctas">
				<a class="btn" href="#games">▶ See our games</a>
				<a class="btn btn--ghost" href="#contact">Join the party</a>
			</div>
		</div>

		<div class="stage">
			<PixelFrame>
				<PixelScene
					playable
					density={150}
					label="A pixel-art sunset over rolling green hills. A little orange block with two eyes hops along the hilltop."
				/>
			</PixelFrame>
			<p class="hint" aria-hidden="true">
				<span class="key">←</span><span class="key">→</span> walk
				<span class="key wide">space</span> hop · or just tap the scene
			</p>
		</div>
	</div>
</section>

<style>
	.hero {
		padding: clamp(3rem, 8vw, 6rem) 0 clamp(3rem, 6vw, 5rem);
		text-align: center;
	}

	.copy {
		max-width: 760px;
		margin: 0 auto;
	}

	h1 {
		font-weight: 700;
		font-size: clamp(2.6rem, 9vw, 5.75rem);
		line-height: 0.98;
		margin: 0 0 1.5rem;
		letter-spacing: -0.01em;
	}

	.lede {
		font-size: clamp(1.1rem, 2.2vw, 1.35rem);
		color: var(--sage);
		max-width: 560px;
		margin: 0 auto 2rem;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.stage {
		margin-top: clamp(3rem, 7vw, 5rem);
	}

	.stage :global(.frame) {
		aspect-ratio: 16 / 9;
	}

	@media (min-width: 900px) {
		.stage :global(.frame) {
			aspect-ratio: 21 / 9;
		}
	}

	.hint {
		margin: 1.25rem 0 0;
		font-family: var(--font-arcade);
		font-size: 0.55rem;
		line-height: 2.4;
		color: var(--olive);
		text-transform: uppercase;
	}

	.key {
		display: inline-block;
		min-width: 2.2em;
		padding: 0 0.5em;
		margin: 0 0.15em;
		color: var(--cream);
		background: var(--bg-3);
		box-shadow: 0 calc(var(--px) * 0.6) 0 var(--night);
	}

	.key.wide {
		margin-left: 1em;
	}

	@media (hover: none) {
		.key {
			display: none;
		}
	}
</style>
