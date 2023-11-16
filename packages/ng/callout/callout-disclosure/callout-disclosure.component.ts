import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { CalloutState, CalloutStateMap } from '../callout-state';

@Component({
	selector: 'lu-callout-disclosure',
	standalone: true,
	imports: [CommonModule, IconComponent, PortalDirective],
	templateUrl: './callout-disclosure.component.html',
	styleUrls: ['./callout-disclosure.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CalloutDisclosureComponent {
	@Input()
	icon: LuccaIcon;

	@Input({ required: true })
	heading: PortalContent;

	@Input()
	palette: Palette = 'none';

	@Input()
	size: 'M' | 'S' = 'M';

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
}
