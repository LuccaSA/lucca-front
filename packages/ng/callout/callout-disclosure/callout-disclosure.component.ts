import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
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

	@Input({ transform: booleanAttribute }) open = false;

	@Output() openChange = new EventEmitter<boolean>();

	public onToggle(event: Event) {
		if (event.target instanceof HTMLDetailsElement) {
			this.openChange.emit(event.target.open);
		}
	}
}
