<script lang="ts">
	type Props = {
		/** Rows of characters; '.' is transparent, other characters index into `colors`. */
		rows: string[];
		colors: Record<string, string>;
		/** Rendered size of one art pixel, in CSS px. */
		scale?: number;
		label?: string;
	};

	let { rows, colors, scale = 4, label }: Props = $props();

	const width = $derived(Math.max(...rows.map((r) => r.length)));
	const cells = $derived(
		rows.flatMap((row, y) =>
			[...row].flatMap((ch, x) => (colors[ch] ? [{ x, y, fill: colors[ch] }] : []))
		)
	);
</script>

<svg
	viewBox="0 0 {width} {rows.length}"
	width={width * scale}
	height={rows.length * scale}
	shape-rendering="crispEdges"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	{#each cells as c (`${c.x},${c.y}`)}
		<rect x={c.x} y={c.y} width="1.02" height="1.02" fill={c.fill} />
	{/each}
</svg>

<style>
	svg {
		display: block;
	}
</style>
