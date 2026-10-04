<script lang="ts">
	import { nav } from '#lib/content.js';

	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<header class:scrolled>
	<div class="container bar">
		<a class="logo" href="/" aria-label="little pixel home">
			<img src="/img/logo.png" alt="" width="175" height="28" />
		</a>
		<nav aria-label="Main">
			<ul>
				{#each nav as item (item.href)}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--bg);
		transition: box-shadow 120ms steps(2);
	}

	.scrolled {
		box-shadow: 0 var(--px) 0 var(--night);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 72px;
	}

	.logo {
		display: block;
		flex: none;
	}

	.logo img {
		display: block;
		width: 175px;
		height: auto;
	}

	@media (min-width: 900px) {
		.bar {
			min-height: 96px;
		}
		.logo img {
			width: 350px;
		}
	}

	ul {
		display: flex;
		gap: clamp(0.75rem, 3vw, 2.25rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	nav a {
		position: relative;
		font-family: var(--font-arcade);
		font-size: 0.62rem;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--sage);
		padding: 0.5rem 0;
	}

	nav a:hover {
		color: var(--cream);
	}

	/* A blinking selection arrow, like a 16-bit menu cursor. */
	nav a::before {
		content: '▶';
		position: absolute;
		left: -1.4em;
		color: var(--sun);
		opacity: 0;
	}

	nav a:hover::before {
		opacity: 1;
		animation: blink 0.8s steps(1) infinite;
	}

	@media (max-width: 520px) {
		nav a {
			font-size: 0.5rem;
		}
		nav a::before {
			display: none;
		}
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
