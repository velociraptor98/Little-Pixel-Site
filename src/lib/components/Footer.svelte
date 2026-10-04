<script lang="ts">
	import { socials } from '#lib/content.js';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="dither" style="--a: var(--bg); --b: var(--night)"></div>
	<div class="inner">
		<div class="container row">
			<img src="/img/icon.png" alt="" width="58" height="56" />
			<ul>
				{#each socials as s (s.label)}
					<li><a href={s.href}>{s.label}</a></li>
				{/each}
			</ul>
			<p class="fine">© {year} little pixel · Thanks for playing</p>
		</div>
	</div>
</footer>

<style>
	.inner {
		background: var(--night);
		padding: 3rem 0;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem 2.5rem;
	}

	img {
		display: block;
		width: 58px;
		height: auto;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		font-family: var(--font-arcade);
		font-size: 0.55rem;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--sage);
	}

	a:hover {
		color: var(--sun);
	}

	.fine {
		margin: 0 0 0 auto;
		font-size: 0.95rem;
		color: var(--olive);
	}

	@media (max-width: 700px) {
		.fine {
			margin-left: 0;
			width: 100%;
		}
	}
</style>
