import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, model, output, ViewEncapsulation } from '@angular/core';
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
	host: {
		'[attr.hidden]': 'removed ? "hidden" : null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CalloutComponent {
	public intl = getIntl(LU_CALLOUT_TRANSLATIONS);

	/**
	 * The title of the callout
	 */
	readonly heading = input<PortalContent>();

	/**
	 * Which palette should be used for the entire callout.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Which size should the callout be? Defaults to medium
	 */
	readonly size = input<'M' | 'S'>();

	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	readonly state = input<CalloutState>();

	/**
	 * Which icon should we display in the callout if any?
	 * Defaults to no icon.
	 */
	readonly icon = input<LuccaIcon>();

	/**
	 * Should we display the remove icon?
	 */
	readonly removable = input<boolean>(false);

	/**
	 * Is the callout removed? Works with two way binding too.
	 */
	readonly removed = model<boolean>(false);

	/**
	 * Defines the icon’s alt attribute used for accessibility
	 */
	readonly iconAlt = input<string | null>(null);

	/**
	 * Displayed in AI mode
	 */
	readonly AI = input(false, { transform: booleanAttribute });

	/**
	 * Emit event when button removed is click
	 */
	readonly removedChange = output<boolean>();

	readonly calloutClasses = computed(() => {
		const palette = getCalloutPalette(this.state(), this.palette());
		const size = this.size();
		const AI = this.AI();
		return {
			[`mod-${size}`]: !!size,
			[`palette-${palette}`]: !AI && !!palette,
		};
	});
}
