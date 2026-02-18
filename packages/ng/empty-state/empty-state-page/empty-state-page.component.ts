import { ChangeDetectionStrategy, Component, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { Hx } from '../empty-state.model';

@Component({
	selector: 'lu-empty-state-page',
	imports: [PortalDirective],
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
	 * Add content above heading
	 */
	readonly slotTop = input<PortalContent>();

	/**
	 * Add illustration beside content
	 */
	readonly illustration = input<PortalContent>();

	readonly heading = input<string>();

	readonly description = input<PortalContent>();

	readonly hx = input(1, { transform: numberAttribute as (value: Hx | `${Hx}`) => Hx });

	public isStringPortalContent(message: PortalContent): message is string {
		return typeof message === 'string';
	}
}
