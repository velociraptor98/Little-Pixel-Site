<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Border colour. */
		edge?: string;
		/** Fill behind the content. */
		fill?: string;
		/** Hard drop shadow colour, or none. */
		shadow?: string | null;
		children: Snippet;
	};

	let { edge = 'var(--cream)', fill = 'var(--bg-2)', shadow = null, children }: Props = $props();
</script>

<!-- Stepped "rounded" corners like the scene card in the sting. -->
<div class="frame" class:has-shadow={shadow} style:--edge={edge} style:--fill={fill} style:--shadow={shadow}>
	<div class="inner">
		{@render children()}
	</div>
</div>

<style>
	.frame {
		--step: var(--px);
		--corner: polygon(
			0 calc(var(--step) * 2),
			var(--step) calc(var(--step) * 2),
			var(--step) var(--step),
			calc(var(--step) * 2) var(--step),
			calc(var(--step) * 2) 0,
			calc(100% - var(--step) * 2) 0,
			calc(100% - var(--step) * 2) var(--step),
			calc(100% - var(--step)) var(--step),
			calc(100% - var(--step)) calc(var(--step) * 2),
			100% calc(var(--step) * 2),
			100% calc(100% - var(--step) * 2),
			calc(100% - var(--step)) calc(100% - var(--step) * 2),
			calc(100% - var(--step)) calc(100% - var(--step)),
			calc(100% - var(--step) * 2) calc(100% - var(--step)),
			calc(100% - var(--step) * 2) 100%,
			calc(var(--step) * 2) 100%,
			calc(var(--step) * 2) calc(100% - var(--step)),
			var(--step) calc(100% - var(--step)),
			var(--step) calc(100% - var(--step) * 2),
			0 calc(100% - var(--step) * 2)
		);
		position: relative;
		height: 100%;
		padding: var(--px);
		background: var(--edge);
		clip-path: var(--corner);
		transition: background 120ms steps(2);
	}

	.frame:focus-within {
		background: var(--sun);
	}

	.has-shadow {
		filter: drop-shadow(calc(var(--px) * -1) var(--px) 0 var(--shadow));
		clip-path: none;
	}

	/* With a shadow, the clip moves to a pseudo layer so the filter isn't clipped away. */
	.has-shadow::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--edge);
		clip-path: var(--corner);
	}

	.has-shadow {
		background: none;
	}

	.has-shadow:focus-within::before {
		background: var(--sun);
	}

	.inner {
		position: relative;
		height: 100%;
		background: var(--fill);
		overflow: hidden;
		--step: var(--px);
		clip-path: polygon(
			0 var(--step),
			var(--step) var(--step),
			var(--step) 0,
			calc(100% - var(--step)) 0,
			calc(100% - var(--step)) var(--step),
			100% var(--step),
			100% calc(100% - var(--step)),
			calc(100% - var(--step)) calc(100% - var(--step)),
			calc(100% - var(--step)) 100%,
			var(--step) 100%,
			var(--step) calc(100% - var(--step)),
			0 calc(100% - var(--step))
		);
	}
</style>
