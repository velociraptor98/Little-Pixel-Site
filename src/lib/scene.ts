// Procedural recreation of the sunset card from the Little Pixel sting.
// Everything is drawn at "art" resolution (one canvas pixel = one art pixel)
// and upscaled by CSS with nearest-neighbour filtering.

export type Variant = 'sunset' | 'day' | 'night';

type Palette = {
	sky1: string;
	sky2: string;
	sun: string;
	sunEdge: string;
	sunHi: string;
	far: string;
	farEdge: string;
	near: string;
	nearDither: string;
	bird: string;
	speck: string;
};

const PALETTES: Record<Variant, Palette> = {
	sunset: {
		sky1: '#ffe1d1',
		sky2: '#fec5a5',
		sun: '#f6a06b',
		sunEdge: '#d67f4a',
		sunHi: '#ffc5a5',
		far: '#ccdbb3',
		farEdge: '#adbd93',
		near: '#8fa073',
		nearDither: '#73845a',
		bird: '#c67039',
		speck: '#f8f4ec'
	},
	day: {
		sky1: '#f8f4ec',
		sky2: '#ffe1d1',
		sun: '#fec5a5',
		sunEdge: '#f6a06b',
		sunHi: '#ffe1d1',
		far: '#adbd93',
		farEdge: '#8fa073',
		near: '#73845a',
		nearDither: '#5d6b45',
		bird: '#73845a',
		speck: '#f8f4ec'
	},
	night: {
		sky1: '#1d2313',
		sky2: '#323a22',
		sun: '#f8f4ec',
		sunEdge: '#ccdbb3',
		sunHi: '#ffffff',
		far: '#3d4629',
		farEdge: '#4b5633',
		near: '#272e1a',
		nearDither: '#1d2313',
		bird: '#f6a06b',
		speck: '#f6a06b'
	}
};

export const SPRITE_COLORS: Record<string, string> = {
	C: '#f8f4ec',
	R: '#c67039',
	H: '#f6a06b',
	E: '#f8f4ec'
};

// The little block hero from the sting: cream outline, rust body, two tall eyes.
export const HERO = [
	'CCCCCCCC',
	'CHHRRRRC',
	'CHRRRRRC',
	'CRRERERC',
	'CRRERERC',
	'CRRRRRRC',
	'CRRRRRRC',
	'CCCCCCCC'
];

const HERO_BLINK = HERO.map((row, y) => (y === 3 ? row.replace(/E/g, 'R') : row));

export type Hero = {
	x: number;
	y: number; // height above the ground, in art pixels
	vy: number;
	facing: 1 | -1;
};

function hash(n: number) {
	const s = Math.sin(n * 127.1) * 43758.5453;
	return s - Math.floor(s);
}

function farHill(x: number, w: number, h: number, seed: number) {
	const base = h * 0.6;
	const wave =
		Math.sin((x + seed * 31) / (w * 0.09)) * h * 0.035 +
		Math.sin((x + seed * 17) / (w * 0.035)) * h * 0.015;
	// The valley dip right of centre, like the sting's horizon.
	const dip = Math.max(0, 1 - Math.abs(x - w * 0.62) / (w * 0.14)) * h * 0.09;
	return Math.round(base + wave + dip);
}

export function nearHill(x: number, w: number, h: number) {
	const cx = w * 0.38;
	const rx = w * 0.78;
	const top = h * 0.72;
	const t = (x - cx) / rx;
	const lift = Math.sqrt(Math.max(0, 1 - t * t));
	return Math.round(h + 2 - (h + 2 - top) * lift);
}

export type DrawOptions = {
	w: number;
	h: number;
	t: number; // seconds
	variant: Variant;
	seed: number;
	hero?: Hero;
	blink?: boolean;
};

export function drawScene(ctx: CanvasRenderingContext2D, o: DrawOptions) {
	const { w, h, t, seed } = o;
	const p = PALETTES[o.variant];
	const rect = (x: number, y: number, rw: number, rh: number, c: string) => {
		ctx.fillStyle = c;
		ctx.fillRect(x, y, rw, rh);
	};

	// Sky: two bands joined by a checkerboard dither.
	const band = Math.round(h * 0.34);
	const ditherRows = Math.max(3, Math.round(h * 0.1));
	rect(0, 0, w, h, p.sky2);
	rect(0, 0, w, band, p.sky1);
	ctx.fillStyle = p.sky1;
	for (let y = band; y < band + ditherRows; y++) {
		for (let x = (y + band) % 2; x < w; x += 2) ctx.fillRect(x, y, 1, 1);
	}

	// Stars at night.
	if (o.variant === 'night') {
		for (let i = 0; i < Math.floor(w * 0.25); i++) {
			const sx = Math.floor(hash(i + seed) * w);
			const sy = Math.floor(hash(i * 3.3 + seed) * h * 0.55);
			const on = Math.sin(t * 2 + i) > -0.4;
			if (on) rect(sx, sy, 1, 1, i % 5 === 0 ? p.speck : '#f8f4ec');
		}
	}

	// Sun (or moon): stepped circle, darker rim, a chunky highlight top-left.
	const r = Math.max(5, Math.round(h * 0.16));
	const sx = Math.round(w * 0.7);
	const sy = Math.round(h * 0.36 + Math.sin(t * 0.6) * 1.2);
	for (let y = -r; y <= r; y++) {
		for (let x = -r; x <= r; x++) {
			const d = Math.sqrt(x * x + y * y);
			if (d > r - 0.4) continue;
			let c = p.sun;
			if (d > r - 1.2) c = p.sunEdge;
			else if (x < -r * 0.05 && y < -r * 0.35 && d < r - 2) c = p.sunHi;
			rect(sx + x, sy + y, 1, 1, c);
		}
	}

	// Birds drifting across, two-frame flap.
	const birds = o.variant === 'night' ? 1 : 3;
	for (let i = 0; i < birds; i++) {
		const speed = 4 + i * 1.7;
		const bx = Math.round(((t * speed + i * w * 0.37 + seed * 13) % (w + 20)) - 10);
		const by = Math.round(h * (0.14 + i * 0.07) + Math.sin(t * 1.3 + i) * 1.5);
		const up = Math.floor(t * 4 + i) % 2 === 0;
		ctx.fillStyle = p.bird;
		if (up) {
			ctx.fillRect(bx - 2, by - 1, 1, 1);
			ctx.fillRect(bx - 1, by, 1, 1);
			ctx.fillRect(bx, by - 0, 1, 1);
			ctx.fillRect(bx + 1, by - 1, 1, 1);
		} else {
			ctx.fillRect(bx - 2, by, 1, 1);
			ctx.fillRect(bx - 1, by, 1, 1);
			ctx.fillRect(bx, by, 1, 1);
			ctx.fillRect(bx + 1, by, 1, 1);
		}
	}

	// Far hills with a dithered ridge line and the odd flower.
	for (let x = 0; x < w; x++) {
		const top = farHill(x, w, h, seed);
		rect(x, top, 1, h - top, p.far);
		if (x % 2 === 0) rect(x, top, 1, 1, p.farEdge);
		if (hash(x * 7.7 + seed) > 0.93) rect(x, top + 3 + Math.floor(hash(x) * 6), 1, 1, p.speck);
	}

	// Near hill dome with a dithered foot.
	for (let x = 0; x < w; x++) {
		const top = nearHill(x, w, h);
		rect(x, top, 1, h - top, p.near);
	}
	ctx.fillStyle = p.nearDither;
	const footStart = h - Math.max(3, Math.round(h * 0.06));
	for (let y = footStart; y < h; y++) {
		const dense = y > h - 2;
		for (let x = y % 2; x < w; x += dense ? 1 : 2) ctx.fillRect(x, y, 1, 1);
	}

	if (o.hero) drawHero(ctx, o.hero, w, h, o.blink ?? false);
}

function drawHero(ctx: CanvasRenderingContext2D, hero: Hero, w: number, h: number, blink: boolean) {
	const size = 8;
	const hx = Math.round(hero.x);
	const ground = nearHill(hx + size / 2, w, h);
	const top = Math.round(ground - size - hero.y);
	const rows = blink ? HERO_BLINK : HERO;
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const sxp = hero.facing === 1 ? x : size - 1 - x;
			const c = SPRITE_COLORS[rows[y][sxp]];
			if (!c) continue;
			ctx.fillStyle = c;
			ctx.fillRect(hx + x, top + y, 1, 1);
		}
	}
}
