import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '@lucca-front/ng/core';
import { CalloutState, CalloutStateMap } from './callout-state';

/**
 * Get icon for callout
 *
 * If the icon is defined then it takes priority over the callout state icon
 */
export function getCalloutIcon(state: CalloutState | undefined, icon: LuccaIcon | undefined): LuccaIcon | undefined {
	if (state) {
		const stateMap = CalloutStateMap[state] ?? { icon };
		return icon ?? stateMap.icon;
	}
	return icon;
}

/**
 * Get palette for callout
 *
 * If the palette is different from "none" then it takes priority over the callout state palette
 */
export function getCalloutPalette(state: CalloutState | undefined, palette: Palette): string {
	if (state) {
		const stateMap = CalloutStateMap[state] ?? { palette };
		return palette !== 'none' ? palette : stateMap.palette;
	}
	return palette;
}
