import { NgIf } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

@Component({
	selector: 'lu-empty-state-section',
	standalone: true,
	imports: [NgIf, LuSafeExternalSvgPipe, PortalDirective],
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

	@Input()
	hx: 1 | 2 | 3 | 4 | 5 | 6 = 3;
}
