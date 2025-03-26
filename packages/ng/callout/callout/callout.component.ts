import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, input, Input, Output, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { intlInputOptions, Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutState } from '../callout-state';
import { LU_CALLOUT_TRANSLATIONS } from '../callout.translate';
import { getCalloutPalette } from '../callout.utils';

@Component({
	selector: 'lu-callout',
	standalone: true,
	imports: [NgClass, PortalDirective, CalloutIconPipe],
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
	state: CalloutState;

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

	public intl = input(...intlInputOptions(LU_CALLOUT_TRANSLATIONS));

	get calloutClasses() {
		const palette = getCalloutPalette(this.state, this.palette);
		return {
			[`mod-${this.size}`]: !!this.size,
			[`palette-${palette}`]: !!palette,
		};
	}
}
