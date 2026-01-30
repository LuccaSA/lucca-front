import { booleanAttribute, ChangeDetectionStrategy, Component, effect, input, output, ViewEncapsulation } from '@angular/core';
import { intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_PAGINATION_TRANSLATIONS } from './pagination.translate';

@Component({
	selector: 'lu-pagination',
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
	imports: [IconComponent, IntlParamsPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
	protected intl = input(...intlInputOptions(LU_PAGINATION_TRANSLATIONS));

	/**
	 * Disabled the previous page arrow
	 */
	readonly isFirstPage = input(false, { transform: booleanAttribute });

	/**
	 * Disabled the next page arrow
	 */
	readonly isLastPage = input(false, { transform: booleanAttribute });

	/**
	 * Where the pagination start
	 */
	readonly from = input<number | null>();

	/**
	 * Where the pagination end
	 */
	readonly to = input<number | null>();

	/**
	 * Total number of items in the pagination
	 */
	readonly itemsCount = input<number | null>();

	/**
	 * Pagination mod (default or compact)
	 */
	readonly mod = input<'default' | 'compact'>('default');

	/**
	 * Emit event when click on previous arrow
	 */
	readonly previousPage = output<void>();

	/**
	 * Emit event when click on next arrow
	 */
	readonly nextPage = output<void>();

	constructor() {
		effect(() => {
			if (this.mod() === 'default' && (this.from() === null || this.to() === null || this.itemsCount() === null)) {
				throw new Error('Pagination in "default" mode requires "from", "to", and "itemsCount" inputs.');
			}
		});
	}
}
