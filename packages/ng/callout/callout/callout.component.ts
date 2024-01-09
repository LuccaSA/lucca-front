import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { getIntl, Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_CALLOUT_TRANSLATIONS } from '../callout.translate';
import { LuccaIcon } from '@lucca-front/icons';
import { CalloutState, CalloutStateMap } from '../callout-state';

@Component({
	selector: 'lu-callout',
	standalone: true,
	imports: [NgIf, PortalDirective],
	templateUrl: './callout.component.html',
	styleUrls: ['./callout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CalloutComponent {
	@Input()
	/**
	 * The title of the callout
	 */
	heading: PortalContent;

	@Input()
	/**
	 * Which palette should be used for the entire callout.
	 * Defaults to none (inherits parent palette)
	 */
	palette: Palette = 'none';

	@Input()
	/**
	 * Which size should the callout be? Defaults to medium
	 */
	size: 'M' | 'S';

	@Input({ transform: booleanAttribute })
	/**
	 * Should we display the remove icon?
	 */
	removable = false;

	@Input()
	/**
	 * Which icon should we display in the callout if any?
	 * Defaults to no icon.
	 */
	icon: LuccaIcon;

	@Input()
	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	set state(state: CalloutState) {
		const { icon, palette } = CalloutStateMap[state];
		if (this.palette === 'none') {
			this.palette = palette;
		}
		if (!this.icon) {
			this.icon = icon;
		}
	}

	@Input({ transform: booleanAttribute })
	/**
	 * Is the callout removed? Works with two way binding too.
	 */
	removed = false;

	@HostBinding('attr.hidden')
	get hiddenAttr(): 'hidden' | null {
		return this.removed ? 'hidden' : null;
	}

	@Output()
	removedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	public intl = getIntl(LU_CALLOUT_TRANSLATIONS);
}
