export const SPRITE_PALETTE: Record<string, string> = {
	C: '#f8f4ec',
	R: '#c67039',
	H: '#f6a06b',
	P: '#fec5a5',
	G: '#adbd93',
	g: '#73845a',
	S: '#ccdbb3'
};

export const ICONS: Record<'heart' | 'star' | 'leaf', string[]> = {
	heart: [
		'.RR...RR.',
		'RHPR.RRRR',
		'RHRRRRRRR',
		'RRRRRRRRR',
		'.RRRRRRR.',
		'..RRRRR..',
		'...RRR...',
		'....R....'
	],
	star: [
		'....H....',
		'....H....',
		'...HPH...',
		'HHHHPHHHH',
		'.HHHHHHH.',
		'..HHHHH..',
		'..HH.HH..',
		'.HH...HH.',
		'.H.....H.'
	],
	leaf: [
		'.....GGGG',
		'...GGGGGG',
		'..GGGSGGG',
		'.GGGSGGG.',
		'.GGSGGG..',
		'GGSGGG...',
		'.gGGG....',
		'g........'
	]
};

// The studio mascot, as seen in the sting.
export const MASCOT = [
	'CCCCCCCC',
	'CHHRRRRC',
	'CHRRRRRC',
	'CRRCRCRC',
	'CRRCRCRC',
	'CRRRRRRC',
	'CRRRRRRC',
	'CCCCCCCC'
];
