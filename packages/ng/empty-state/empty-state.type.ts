import { BubbleIllustration } from '@lucca-front/ng/bubble-illustration';

/**
 * Available EmptyState Types
 */

export const EMPTY_STATE_HEADING_LEVEL = [1, 2, 3, 4, 5, 6] as const;
export type EmptyStateHeadingLevel = (typeof EMPTY_STATE_HEADING_LEVEL)[number];

/** @deprecated use `EMPTY_STATE_HEADING_LEVEL` instead */
export const EMPTY_STATE_HX = EMPTY_STATE_HEADING_LEVEL;
/** @deprecated use `EmptyStateHeadingLevel` instead */
export type Hx = EmptyStateHeadingLevel;

export const EMPTY_STATE_HEADING_STYLE = [1, 2] as const;
export type EmptyStateHeadingStyle = (typeof EMPTY_STATE_HEADING_STYLE)[number];

/** @deprecated use `EMPTY_STATE_HEADING_STYLE` instead */
export const EMPTY_STATE_HX_STYLE = EMPTY_STATE_HEADING_STYLE;
/** @deprecated use `EmptyStateHeadingStyle` instead */
export type HxStyle = EmptyStateHeadingStyle;

export const ICON_TO_ILLUSTRATION: Record<string, BubbleIllustration> = {
	Banknote: 'banknote',
	Bell: 'bell',
	Bulb: 'bulb',
	Calendar: 'calendar',
	Chat: 'chat',
	Clock: 'clock',
	Coffee: 'coffee',
	CreditCard: 'paymentCards',
	Folder: 'folder',
	Gift: 'gift',
	Graduate: 'graduate',
	IDCard: 'polaroid',
	Lock: 'lock',
	Mail: 'mail',
	Megaphone: 'megaphone',
	Paint: 'paint',
	Paper: 'invoice',
	Party: 'party',
	Picture: 'picture',
	Poc: 'banknote',
	Rocket: 'rocket',
	Search: 'magnifyingGlass',
	Temperature: 'temperature',
	Thumb: 'thumbUp',
	Warning: 'warning',
};
