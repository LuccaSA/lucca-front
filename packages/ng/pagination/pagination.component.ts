import { ChangeDetectionStrategy, Component, effect, input, output, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions, IntlParamsPipe, luBooleanAttribute, luOptionalNullableNumberAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_PAGINATION_TRANSLATIONS } from './pagination.translate';
import { PaginationMod } from './pagination.type';

@Component({
	selector: 'lu-pagination',
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
	imports: [IconComponent, IntlParamsPipe, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
	readonly intl = input(...intlInputOptions(LU_PAGINATION_TRANSLATIONS));

	/**
	 * Disabled the previous page arrow
	 */
	readonly isFirstPage = input(false, { transform: luBooleanAttribute });

	/**
	 * Disabled the next page arrow
	 */
	readonly isLastPage = input(false, { transform: luBooleanAttribute });

	/**
	 * Where the pagination start
	 */
	readonly from = input(undefined, { transform: luOptionalNullableNumberAttribute });

	/**
	 * Where the pagination end
	 */
	readonly to = input(undefined, { transform: luOptionalNullableNumberAttribute });

	/**
	 * Total number of items in the pagination
	 */
	readonly itemsCount = input(undefined, { transform: luOptionalNullableNumberAttribute });

	/**
	 * Pagination mod (default or compact)
	 */
	readonly mod = input<PaginationMod>('default');

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
