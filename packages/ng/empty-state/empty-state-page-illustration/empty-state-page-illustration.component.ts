import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-empty-state-page-illustration',
	templateUrl: './empty-state-page-illustration.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'pr-u-displayFlex',
	},
})
export class EmptyStatePageIllustration {
	/**
	 * URL of the illustration.
	 */
	readonly src = input<string | null>(null);
	/**
	 * Alternative text of the illustration. Defaults to an empty string (decorative image).
	 */
	readonly alt = input<string | null>('');
}
