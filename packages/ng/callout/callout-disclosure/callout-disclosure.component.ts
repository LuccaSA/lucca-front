import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, output, input, computed } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { CalloutIconPipe } from '../callout-icon.pipe';
import { CalloutState } from '../callout-state';
import { getCalloutPalette } from '../callout.utils';

@Component({
	selector: 'lu-callout-disclosure',
	imports: [IconComponent, PortalDirective, CalloutIconPipe],
	templateUrl: './callout-disclosure.component.html',
	styleUrl: './callout-disclosure.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CalloutDisclosureComponent {
	readonly heading = input.required<PortalContent>();

	readonly icon = input<LuccaIcon>();

	readonly palette = input<Palette>('none');

	readonly size = input<'M' | 'S'>('M');

	/**
	 * State is a shorthand to set the icon and the palette to the recommended values for the icon and palette based on
	 * the provided state.
	 *
	 * If one of the icon or palette inputs are filled along with the state input, their values will have the priority over
	 * state (so setting state to success and palette to warning will make the palette warning)
	 */
	readonly state = input<CalloutState>();

	readonly open = input(false, { transform: booleanAttribute });

	readonly calloutPalette = computed<string>(() => {
		return getCalloutPalette(this.state(), this.palette());
	});

	readonly calloutClasses = computed(() => {
		const palette = this.calloutPalette();
		return {
			[`mod-${this.size()}`]: !!this.size(),
			[`palette-${palette}`]: !!palette,
		};
	});

	openChange = output<boolean>();

	public onToggle(event: Event) {
		if (event.target instanceof HTMLDetailsElement) {
			this.openChange.emit(event.target.open);
		}
	}
}
