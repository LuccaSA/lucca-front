import { BubbleIllustration } from '@lucca-front/ng/bubble-illustration';

/**
 * Available EmptyState Types
 */

export const EMPTY_STATE_HX = [1, 2, 3, 4, 5, 6] as const;
export type Hx = (typeof EMPTY_STATE_HX)[number];

export const EMPTY_STATE_HX_STYLE = [1, 2] as const;
export type HxStyle = (typeof EMPTY_STATE_HX_STYLE)[number];

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
