import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca-front/ng/core';
import { CalloutStateMap, CalloutStates } from './callout-state';
import { getCalloutIcon, getCalloutPalette } from './callout.utils';

describe('CalloutUtils', () => {
	describe(getCalloutIcon.name, () => {
		it('should be state icon when state is defined and icon is undefined', () => {
			for (const state of CalloutStates) {
				expect(getCalloutIcon(state, undefined)).toBe(CalloutStateMap[state].icon);
			}
		});

		it('should be icon when state is defined and icon is defined', () => {
			for (const state of CalloutStates) {
				expect(getCalloutIcon(state, 'signHelp')).toBe<LuccaIcon>('signHelp');
			}
		});

		it('should be icon when state is undefined and icon is defined', () => {
			expect(getCalloutIcon(undefined, 'adduser')).toBe<LuccaIcon>('adduser');
		});

		it('should be undefined when state is undefined and icon is undefined', () => {
			expect(getCalloutIcon(undefined, undefined)).toBeUndefined();
		});
	});

	describe(getCalloutPalette.name, () => {
		it('should be state palette when state is defined and palette is none', () => {
			for (const state of CalloutStates) {
				expect(getCalloutPalette(state, 'none')).toBe(CalloutStateMap[state].palette);
			}
		});

		it('should be palette when state is defined and palette is defined', () => {
			for (const state of CalloutStates) {
				expect(getCalloutPalette(state, 'warning')).toBe('warning');
			}
		});

		it('should be palette when state is undefined and palette is defined', () => {
			expect(getCalloutPalette(undefined, 'warning')).toBe('warning');
		});

		it('should be none when state is undefined and palette is none', () => {
			expect(getCalloutPalette(undefined, 'none')).toBe<Palette>('none');
		});
	});
});
