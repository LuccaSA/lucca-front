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

	@Input({
		required: true,
	})
	title: string;

	@Input({
		required: true,
	})
	description: PortalContent;

	@Input()
	hx: number = 3;
}
