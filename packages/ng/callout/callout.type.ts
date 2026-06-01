import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca/prisme/core';

/**
 * Available CalloutComponent Types
 */

export const CALLOUT_SIZE = ['M', 'S'] as const;
export type CalloutSize = (typeof CALLOUT_SIZE)[number];

export const CALLOUT_POPOVER_SIZE = ['M', 'S', 'XS'] as const;
export type CalloutPopoverSize = (typeof CALLOUT_POPOVER_SIZE)[number];

export const CalloutStates = ['success', 'warning', 'error'] as const;
export type CalloutState = (typeof CalloutStates)[number];

export const CALLOUT_HX = [1, 2, 3, 4, 5, 6] as const;
export type CalloutHx = (typeof CALLOUT_HX)[number];

export const CalloutStateMap: Record<CalloutState, { icon: LuccaIcon; palette: Palette }> = {
	success: {
		icon: 'signSuccess',
		palette: 'success',
	},
	warning: {
		icon: 'signWarning',
		palette: 'warning',
	},
	error: {
		icon: 'signError',
		palette: 'error',
	},
};
