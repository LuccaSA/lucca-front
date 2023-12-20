import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSafeExternalSvgPipe } from '../../safe-content/safe-external-svg.pipe';
import { PortalContent, PortalDirective } from '../../core/portal';
import { Palette } from '../../core/type';

@Component({
	selector: 'lu-empty-state-section',
	standalone: true,
	imports: [CommonModule, LuSafeExternalSvgPipe, PortalDirective],
	templateUrl: './empty-state-section.component.html',
	styleUrl: './empty-state-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class EmptyStateSectionComponent {
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
}
