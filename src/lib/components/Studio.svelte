<script lang="ts">
	import { stats, values } from '#lib/content.js';
	import { ICONS, MASCOT, SPRITE_PALETTE } from '#lib/sprites.js';
	import PixelFrame from './PixelFrame.svelte';
	import PixelSprite from './PixelSprite.svelte';

	const SEGMENTS = 20;
</script>

<section id="studio" class="studio">
	<div class="dither" style="--a: var(--bg); --b: var(--bg-2)"></div>
	<div class="band">
		<div class="container split">
			<div class="about">
				<p class="eyebrow">About the studio</p>
				<h2 class="section-title pixel-shadow">A small studio<br />with a soft spot.</h2>
				<p>
					little pixel is a tiny, independent team making games that feel like a warm sunset: bright,
					gentle and over a little too soon. We sketch on paper, prototype in a weekend and polish
					for as long as it takes.
				</p>
				<p>
					Our mascot is a little block who never stops hopping. We think that's a pretty good way to
					make games, too.
				</p>
			</div>

			<div class="sheet">
				<PixelFrame fill="var(--bg)" edge="var(--sage-2)">
					<div class="sheet-inner">
						<div class="who">
							<div class="avatar">
								<PixelSprite rows={MASCOT} colors={SPRITE_PALETTE} scale={7} label="The little pixel mascot" />
							</div>
							<div>
								<p class="name">LITTLE PIXEL</p>
								<p class="cls">Lv. 1 · Game Studio</p>
							</div>
						</div>
						<dl>
							{#each stats as stat (stat.label)}
								{@const filled = Math.round((stat.value / 100) * SEGMENTS)}
								<div class="stat">
									<dt>{stat.label}</dt>
									<dd>
										<span class="bar" aria-hidden="true">
											{#each { length: SEGMENTS }, i (i)}
												<span class="seg" class:on={i < filled}></span>
											{/each}
										</span>
										<span class="num">{stat.value}</span>
									</dd>
								</div>
							{/each}
						</dl>
					</div>
				</PixelFrame>
			</div>
		</div>

		<div class="container">
			<ul class="values">
				{#each values as v (v.title)}
					<li>
						<PixelSprite rows={ICONS[v.icon]} colors={SPRITE_PALETTE} scale={5} />
						<h3>{v.title}</h3>
						<p>{v.body}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="dither" style="--a: var(--bg-2); --b: var(--bg)"></div>
</section>

<style>
	.band {
		background: var(--bg-2);
		padding: clamp(4rem, 9vw, 7rem) 0;
	}

	.split {
		display: grid;
		gap: 3rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.split {
			grid-template-columns: 1.1fr 1fr;
			gap: 5rem;
		}
	}

	.about p:not(.eyebrow) {
		color: var(--sage);
		max-width: 52ch;
	}

	.sheet-inner {
		padding: clamp(1.25rem, 3vw, 2rem);
	}

	.who {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding-bottom: 1.5rem;
		margin-bottom: 1.5rem;
		border-bottom: var(--px) dashed var(--bg-3);
	}

	.avatar {
		display: grid;
		place-items: center;
		width: 88px;
		height: 88px;
		background: var(--sky-2);
		box-shadow: inset 0 calc(var(--px) * -4) 0 var(--olive);
		animation: hop 1.6s steps(2) infinite;
	}

	.name {
		margin: 0 0 0.5rem;
		font-family: var(--font-arcade);
		font-size: 0.8rem;
	}

	.cls {
		margin: 0;
		color: var(--sun);
		font-family: var(--font-arcade);
		font-size: 0.55rem;
	}

	dl {
		display: grid;
		gap: 1.1rem;
		margin: 0;
	}

	.stat {
		display: grid;
		gap: 0.4rem;
	}

	dt {
		font-family: var(--font-arcade);
		font-size: 0.55rem;
		text-transform: uppercase;
		color: var(--sage-2);
	}

	dd {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: 0;
	}

	.bar {
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		gap: 2px;
		flex: 1;
		padding: 3px;
		background: var(--night);
	}

	.seg {
		height: calc(var(--px) * 2.4);
		background: var(--bg-3);
	}

	.seg.on {
		background: var(--sun);
	}

	.seg.on:nth-child(-n + 6) {
		background: var(--rust);
	}

	.num {
		width: 2.5ch;
		text-align: right;
		font-family: var(--font-arcade);
		font-size: 0.65rem;
	}

	.values {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: 2.5rem;
		margin: clamp(4rem, 8vw, 6rem) 0 0;
		padding: 0;
		list-style: none;
	}

	.values h3 {
		font-size: 1.4rem;
		margin: 1rem 0 0.4rem;
	}

	.values p {
		margin: 0;
		color: var(--sage);
	}

	@keyframes hop {
		50% {
			transform: translateY(calc(var(--px) * -1.5));
		}
	}
</style>
