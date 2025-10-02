import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Hx } from '../empty-state.model';

@Component({
	selector: 'lu-empty-state-section',
	standalone: true,
	imports: [LuSafeExternalSvgPipe, PortalDirective],
	templateUrl: './empty-state-section.component.html',
	styleUrl: './empty-state-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class EmptyStateSectionComponent {
	/**
	 * Icon URL
	 */
	@Input()
	icon = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknote.svg';

	@Input()
	palette: Palette = 'none';

	@Input({
		transform: booleanAttribute,
	})
	center = false;

	@Input()
	heading: string;

	@Input()
	description: PortalContent;

	@Input({
		transform: numberAttribute as (value: Hx | `${Hx}`) => Hx,
	})
	hx: Hx = 3;

	get emptyStateClasses() {
		return {
			[`palette-${this.palette}`]: !!this.palette,
		};
	}
}
