import { Pipe, PipeTransform } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { CalloutState } from './callout-state';
import { getCalloutIcon } from './callout.utils';

/**
 * Get icon for callout
 *
 * If the icon is defined then it takes priority over the callout state icon
 */
@Pipe({
	name: 'luCalloutIcon',
	standalone: true,
})
export class CalloutIconPipe implements PipeTransform {
	transform(state: CalloutState, icon: LuccaIcon): LuccaIcon | undefined {
		return getCalloutIcon(state, icon);
	}
}
