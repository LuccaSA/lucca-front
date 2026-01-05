import { ChangeDetectionStrategy, Component, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Hx } from '../empty-state.model';

@Component({
	selector: 'lu-empty-state-page',
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
	/**
	 * Icon image (URL)
	 */
	readonly icon = input<string | null>(null);

	/**
	 * Top right background image (URL)
	 */
	readonly topRightBackground = input<string>('https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg');

	/**
	 * Top right foreground image (URL)
	 */
	readonly topRightForeground = input<string>('https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg');

	/**
	 * Bottom left background image (URL)
	 */
	readonly bottomLeftBackground = input<string>('https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg');

	/**
	 * Bottom left foreground image (URL)
	 */
	readonly bottomLeftForeground = input<string>('https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg');

	/**
	 * Background color for content (text)
	 */
	readonly contentBackgroundColor = input<string>('var(--pr-t-elevation-surface-default)');

	/**
	 * Add any content on top of empty state page
	 */
	readonly slotTop = input<PortalContent>();

	/**
	 * The title of the empty state page
	 */
	readonly heading = input<string>();

	/**
	 * The description of the empty state page
	 */
	readonly description = input<PortalContent>();

	/**
	 * Define the aria level of the title
	 */
	readonly hx = input(1, { transform: numberAttribute as (value: Hx | `${Hx}`) => Hx });
}
