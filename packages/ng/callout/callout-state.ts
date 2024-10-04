import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca-front/ng/core';

export const CalloutStates = ['success', 'warning', 'error'] as const;

export type CalloutState = (typeof CalloutStates)[number];

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
