/**
 * Available OrnamentComponent Types
 */

export const ORNAMENT_BUBBLE = [1, 2, 3, 4] as const;
export type OrnamentBubble = (typeof ORNAMENT_BUBBLE)[number];

export const ORNAMENT_ILLUSTRATION = [
	'calculator',
	'calendar',
	'cleemy-card',
	'coffee',
	'headphone',
	'mail',
	'magnifying-glass',
	'medallon',
	'piggy-bank',
	'polaroid-female',
	'polaroid-male',
	'polaroids',
	'post-it-success',
	'post-it-warning',
] as const;
export type OrnamentIllustration = (typeof ORNAMENT_ILLUSTRATION)[number];
