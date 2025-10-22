import { ChangeDetectionStrategy, Component, Input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Hx } from '../empty-state.model';

@Component({
	selector: 'lu-empty-state-page',
	standalone: true,
	imports: [LuSafeExternalSvgPipe, PortalDirective],
	templateUrl: './empty-state-page.component.html',
	styleUrl: './empty-state-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'emptyState-wrapper',
	},
})
export class EmptyStatePageComponent {
	@Input()

	/**
	 * Icon image (URL)
	 */
	icon = null;

	/**
	 * Top right background image (URL)
	 */
	@Input()
	topRightBackground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg';

	/**
	 * Top right foreground image (URL)
	 */
	@Input()
	topRightForeground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg';

	/**
	 * Bottom left background image (URL)
	 */
	@Input()
	bottomLeftBackground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg';

	/**
	 * Bottom left foreground image (URL)
	 */
	@Input()
	bottomLeftForeground = 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg';

	/**
	 * Background color for content (text)
	 */
	@Input()
	contentBackgroundColor = 'var(--pr-t-elevation-surface-default)';

	@Input()
	slotTop: PortalContent;

	@Input()
	heading: string;

	@Input()
	description: PortalContent;

	@Input({
		transform: numberAttribute as (value: Hx | `${Hx}`) => Hx,
	})
	hx: Hx = 1;
}
