<script lang="ts">
	import { games, itchProfile } from '#lib/content.js';
	import PixelFrame from './PixelFrame.svelte';
</script>

<section id="games" class="games">
	<div class="container">
		<header class="head">
			<div>
				<p class="eyebrow">Select a world</p>
				<h2 class="section-title pixel-shadow">Our games</h2>
				<p class="sub">Two little games you can play right now, free in your browser on itch.io.</p>
			</div>
			<a class="more" href={itchProfile} target="_blank" rel="noopener">All games on itch.io ▶</a>
		</header>

		<ul class="grid">
			{#each games as game, i (game.title)}
				<li>
					<PixelFrame fill="var(--bg-2)" shadow="var(--night)">
						<article>
							<div class="thumb">
								<img class="cover" src={game.cover.src} alt={game.cover.alt} width="1200" height="750" loading="lazy" />
								<img class="play" src={game.gameplay.src} alt={game.gameplay.alt} width="1200" height="750" loading="lazy" />
								<span class="slot" aria-hidden="true">0{i + 1}</span>
							</div>
							<div class="body">
								<p class="meta">
									<span class="genre">{game.genre}</span>
									<span class="status" data-status={game.status}>{game.status}</span>
								</p>
								<h3>{game.title}</h3>
								<p class="blurb">{game.blurb}</p>
								<ul class="tags" aria-label="Tags">
									{#each game.tags as tag (tag)}
										<li>{tag}</li>
									{/each}
								</ul>
								<a class="btn" href={game.href} target="_blank" rel="noopener">
									▶ Play {game.title}<span class="sr-only"> on itch.io (opens in a new tab)</span>
								</a>
							</div>
						</article>
					</PixelFrame>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.games {
		padding: clamp(4rem, 9vw, 7rem) 0;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.5rem 3rem;
		margin-bottom: 3rem;
	}

	.head > div {
		max-width: 560px;
	}

	.sub {
		color: var(--sage);
		margin: 0;
	}

	.more {
		font-family: var(--font-arcade);
		font-size: 0.6rem;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--sun);
		padding: 0.5rem 0;
	}

	.more:hover {
		color: var(--cream);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
		gap: calc(var(--px) * 6);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.grid > li {
		transition: transform 120ms steps(3);
	}

	.grid > li:hover {
		transform: translateY(calc(var(--px) * -2));
	}

	article {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.thumb {
		position: relative;
		display: block;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--night);
		border-bottom: var(--px) solid var(--cream);
	}

	/* Screenshots aren't at native pixel scale, so let the browser smooth them. */
	.thumb img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		image-rendering: auto;
	}

	/* Hovering the card swaps the title screen for gameplay, in chunky steps. */
	.play {
		opacity: 0;
		transition: opacity 240ms steps(4);
	}

	article:hover .play,
	article:focus-within .play {
		opacity: 1;
	}

	.slot {
		position: absolute;
		top: calc(var(--px) * 2);
		left: calc(var(--px) * 2);
		padding: 0.5em 0.6em;
		font-family: var(--font-arcade);
		font-size: 0.55rem;
		color: var(--cream);
		background: var(--bg);
	}

	.body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.5rem 1.5rem 1.75rem;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 0 0 0.9rem;
		font-family: var(--font-arcade);
		font-size: 0.5rem;
		text-transform: uppercase;
		line-height: 1.6;
	}

	.genre {
		color: var(--sage-2);
	}

	.status {
		padding: 0.5em 0.7em;
		color: var(--bg);
		background: var(--sun);
	}

	.status[data-status='Early build'] {
		background: var(--sage);
	}

	h3 {
		font-size: 2rem;
		line-height: 1.1;
		margin: 0 0 0.6rem;
	}

	.blurb {
		margin: 0 0 1.25rem;
		color: var(--sage);
		font-size: 1.05rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0 0 1.75rem;
		padding: 0;
		list-style: none;
	}

	.tags li {
		padding: 0.15em 0.6em;
		font-size: 0.9rem;
		color: var(--sage);
		background: var(--bg-3);
	}

	.body .btn {
		align-self: flex-start;
		margin-top: auto;
	}
</style>
