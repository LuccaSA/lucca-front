import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutState } from '../callout-state';
import { getCalloutPalette } from '../callout.utils';

@Component({
	selector: 'lu-callout-disclosure',
	standalone: true,
	imports: [CommonModule, IconComponent, NgClass, PortalDirective, CalloutIconPipe],
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
	state: CalloutState;

	@Input({ transform: booleanAttribute }) open = false;

	@Output() openChange = new EventEmitter<boolean>();

	public onToggle(event: Event) {
		if (event.target instanceof HTMLDetailsElement) {
			this.openChange.emit(event.target.open);
		}
	}

	get calloutClasses() {
		const palette = getCalloutPalette(this.state, this.palette);
		return {
			[`mod-${this.size}`]: !!this.size,
			[`palette-${palette}`]: !!palette,
		};
	}
}
