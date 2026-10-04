// All site copy lives here. The games come from https://littlepixelss.itch.io/;
// the stats and values are still placeholders.

export const itchProfile = 'https://littlepixelss.itch.io/';

export type Game = {
	title: string;
	genre: string;
	status: 'Released' | 'Early build';
	blurb: string;
	tags: string[];
	href: string;
	cover: { src: string; alt: string };
	gameplay: { src: string; alt: string };
};

export const games: Game[] = [
	{
		title: 'Echo',
		genre: 'Retro bullet hell',
		status: 'Early build',
		blurb:
			'A hyper-casual retro space shooter. Weave through rings of bullets, outlast the warnings and chase a new best score. It is an early build, so feedback and feature requests are very welcome.',
		tags: ['Shooter', 'Retro', 'Play in browser'],
		href: 'https://littlepixelss.itch.io/echo',
		cover: {
			src: '/img/games/echo-title.webp',
			alt: 'Echo title screen: a chunky blue ECHO logo over a starfield with nebulae and a small spaceship.'
		},
		gameplay: {
			src: '/img/games/echo-play.webp',
			alt: 'Echo gameplay: the player ship dodges spiralling green and white bullet patterns under a WARNING banner.'
		}
	},
	{
		title: 'Commute',
		genre: 'Relaxing hypercasual',
		status: 'Released',
		blurb:
			'A calm little game made for the ride to and from work. Hold to steer — the further you hold, the faster you go — and keep the combo going.',
		tags: ['Mouse only', 'Atmospheric', 'Play in browser'],
		href: 'https://littlepixelss.itch.io/commute',
		cover: {
			src: '/img/games/commute-title.webp',
			alt: 'Commute title screen: the word COMMUTE above a grey arrow on a soft, curved grid, with "tap to play" below.'
		},
		gameplay: {
			src: '/img/games/commute-play.webp',
			alt: 'Commute gameplay: a dark arrow glides across a warped grid past dark squares, with a score of 58 and a x3 combo.'
		}
	}
];

export const stats = [
	{ label: 'Whimsy', value: 99 },
	{ label: 'Coziness', value: 92 },
	{ label: 'Pixels placed', value: 78 },
	{ label: 'Bugs squashed', value: 64 }
];

export const values = [
	{
		icon: 'heart',
		title: 'Small on purpose',
		body: 'Tiny teams make games with fingerprints on them. Every pixel is placed by hand.'
	},
	{
		icon: 'star',
		title: 'Joy first',
		body: 'If a moment does not make us smile in playtest, it does not make it into the game.'
	},
	{
		icon: 'leaf',
		title: 'Gentle by design',
		body: 'No timers yelling at you. Our games are places you can sit down in and breathe.'
	}
] as const;

export const nav = [
	{ label: 'Games', href: '#games' },
	{ label: 'Studio', href: '#studio' },
	{ label: 'Say hi', href: '#contact' }
];

export const socials = [
	{ label: 'itch.io', href: itchProfile }
];
