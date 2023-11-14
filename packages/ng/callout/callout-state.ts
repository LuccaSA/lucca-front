import { Palette } from '@lucca-front/ng/core';
import { LuccaIcon } from '@lucca-front/icons';

export type CalloutState = 'success' | 'warning' | 'error';

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
