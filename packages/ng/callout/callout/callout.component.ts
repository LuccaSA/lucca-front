import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, input, Input, output, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { getIntl, Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutState } from '../callout-state';
import { LU_CALLOUT_TRANSLATIONS } from '../callout.translate';
import { getCalloutPalette } from '../callout.utils';

@Component({
	selector: 'lu-callout',
	imports: [PortalDirective, CalloutIconPipe, IconComponent],
	templateUrl: './callout.component.html',
	styleUrl: './callout.component.scss',
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

	removedChange = output<boolean>();

	AI = input(false, { transform: booleanAttribute });

	iconAlt = input<string | null>(null);

	public intl = getIntl(LU_CALLOUT_TRANSLATIONS);

	get calloutClasses() {
		const palette = getCalloutPalette(this.state, this.palette);
		return {
			[`mod-${this.size}`]: !!this.size,
			[`palette-${palette}`]: !this.AI() && !!palette,
		};
	}
}
