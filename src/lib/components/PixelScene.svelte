<script lang="ts">
	import { onMount } from 'svelte';
	import { drawScene, type Hero, type Variant } from '#lib/scene.js';

	type Props = {
		variant?: Variant;
		/** Roughly how many art pixels across the scene should be. */
		density?: number;
		seed?: number;
		playable?: boolean;
		label: string;
	};

	let { variant = 'sunset', density = 160, seed = 1, playable = false, label }: Props = $props();

	let wrap: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

		let w = 0;
		let h = 0;
		let visible = true;
		let raf = 0;
		let last = performance.now();
		let t = seed * 3;

		const hero: Hero = { x: 0, y: 0, vy: 0, facing: 1 };
		const keys = new Set<string>();
		let nextHop = 1.5;
		let wanderTarget = 0;
		let blinkUntil = 0;
		let nextBlink = 2;

		function resize() {
			const cw = wrap.clientWidth;
			const ch = wrap.clientHeight;
			const scale = Math.max(2, Math.round(cw / density));
			w = Math.ceil(cw / scale);
			h = Math.ceil(ch / scale);
			canvas.width = w;
			canvas.height = h;
			canvas.style.width = `${w * scale}px`;
			canvas.style.height = `${h * scale}px`;
			if (hero.x === 0) {
				hero.x = Math.round(w * 0.42);
				wanderTarget = hero.x;
			}
			hero.x = Math.min(hero.x, w - 9);
			render();
		}

		function jump() {
			if (hero.y === 0) hero.vy = 34;
		}

		function step(dt: number) {
			t += dt;

			const left = keys.has('ArrowLeft') || keys.has('a');
			const right = keys.has('ArrowRight') || keys.has('d');
			if (left || right) {
				hero.facing = right ? 1 : -1;
				hero.x += (right ? 1 : -1) * 22 * dt;
				wanderTarget = hero.x;
				nextHop = t + 4;
			} else if (Math.abs(wanderTarget - hero.x) > 0.5) {
				// Idle wander: amble toward a target, hopping along the way.
				const dir = Math.sign(wanderTarget - hero.x) as 1 | -1;
				hero.facing = dir;
				hero.x += dir * 9 * dt;
			}
			hero.x = Math.max(2, Math.min(w - 10, hero.x));

			if (t > nextHop && !left && !right) {
				jump();
				nextHop = t + 1.8 + Math.random() * 2.2;
				if (Math.random() < 0.5) wanderTarget = w * (0.15 + Math.random() * 0.5);
			}

			if (hero.y > 0 || hero.vy > 0) {
				hero.vy -= 140 * dt;
				hero.y = Math.max(0, hero.y + hero.vy * dt);
				if (hero.y === 0) hero.vy = 0;
			}

			if (t > nextBlink) {
				blinkUntil = t + 0.14;
				nextBlink = t + 2.5 + Math.random() * 3;
			}
		}

		function render() {
			if (!w || !h) return;
			drawScene(ctx, { w, h, t, variant, seed, hero: playable ? hero : undefined, blink: t < blinkUntil });
		}

		function loop(now: number) {
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			step(dt);
			render();
			raf = visible ? requestAnimationFrame(loop) : 0;
		}

		function start() {
			if (still || raf) return;
			last = performance.now();
			raf = requestAnimationFrame(loop);
		}

		const ro = new ResizeObserver(resize);
		ro.observe(wrap);

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
		});
		io.observe(wrap);

		const GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'd', 'w'];
		function onKeyDown(e: KeyboardEvent) {
			if (!GAME_KEYS.includes(e.key)) return;
			e.preventDefault();
			keys.add(e.key);
			if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') jump();
		}
		function onKeyUp(e: KeyboardEvent) {
			keys.delete(e.key);
		}
		function onBlur() {
			keys.clear();
		}

		if (playable && !still) {
			wrap.addEventListener('keydown', onKeyDown);
			wrap.addEventListener('keyup', onKeyUp);
			wrap.addEventListener('blur', onBlur);
			wrap.addEventListener('pointerdown', jump);
		}

		resize();
		start();

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			wrap.removeEventListener('keydown', onKeyDown);
			wrap.removeEventListener('keyup', onKeyUp);
			wrap.removeEventListener('blur', onBlur);
			wrap.removeEventListener('pointerdown', jump);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class="scene"
	class:playable
	bind:this={wrap}
	role="img"
	aria-label={label}
	tabindex={playable ? 0 : undefined}
>
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: var(--sky-2);
	}

	.playable {
		cursor: pointer;
		touch-action: manipulation;
	}

	.playable:focus-visible {
		outline: none;
	}

	canvas {
		display: block;
	}
</style>
