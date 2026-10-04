<script lang="ts">
	import { onMount } from 'svelte';

	let video = $state<HTMLVideoElement>();
	let leaving = $state(false);
	let gone = $state(false);

	function finish() {
		if (leaving) return;
		leaving = true;
		try {
			sessionStorage.setItem('lp-splash-seen', '1');
		} catch {}
		setTimeout(() => {
			document.documentElement.classList.remove('splash');
			gone = true;
		}, 450);
	}

	onMount(() => {
		if (!document.documentElement.classList.contains('splash')) {
			gone = true;
			return;
		}
		video?.play().catch(finish);
		const fallback = setTimeout(finish, 5000);
		const onKey = () => finish();
		window.addEventListener('keydown', onKey, { once: true });
		return () => {
			clearTimeout(fallback);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

{#if !gone}
	<div class="splash" class:leaving aria-hidden="true">
		<video
			bind:this={video}
			src="/video/sting.mp4"
			muted
			playsinline
			preload="auto"
			onended={finish}
		></video>
		<button class="skip" onclick={finish} tabindex="-1">Skip ▶</button>
	</div>
{/if}

<style>
	.splash {
		display: none;
	}

	:global(html.splash) .splash {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		background: var(--bg);
		/* If scripts never hydrate, don't trap anyone behind the sting. */
		animation: auto-out 0.4s 6s forwards steps(4);
	}

	.leaving {
		animation: out 0.4s forwards steps(4) !important;
	}

	/* The sting's edges are empty background, so cropping to fill the screen is safe. */
	video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.skip {
		position: absolute;
		right: var(--gutter);
		bottom: var(--gutter);
		font-family: var(--font-arcade);
		font-size: 0.6rem;
		color: var(--sage-2);
		background: none;
		border: 0;
		padding: 1em;
		cursor: pointer;
	}

	.skip:hover {
		color: var(--cream);
	}

	@keyframes out {
		to {
			opacity: 0;
			visibility: hidden;
		}
	}

	@keyframes auto-out {
		to {
			opacity: 0;
			visibility: hidden;
		}
	}
</style>
