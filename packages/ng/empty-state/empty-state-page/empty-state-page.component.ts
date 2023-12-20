import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuSafeExternalSvgPipe } from '../../safe-content/safe-external-svg.pipe';
import { PortalContent, PortalDirective } from '../../core/portal';

@Component({
	selector: 'lu-empty-state-page',
	standalone: true,
	imports: [CommonModule, LuSafeExternalSvgPipe, PortalDirective],
	templateUrl: './empty-state-page.component.html',
	styleUrl: './empty-state-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class EmptyStatePageComponent {
	@Input()
	icon = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/message/medal-01.svg';

	@Input()
	topRightBackground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg';

	@Input()
	topRightForeground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg';

	@Input()
	bottomLeftBackground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg';

	@Input()
	bottomLeftForeground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg';

	@Input({
		required: true,
	})
	title: string;

	@Input({
		required: true,
	})
	description: PortalContent;
}
