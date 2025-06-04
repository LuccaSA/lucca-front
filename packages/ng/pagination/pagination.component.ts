import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { getIntl, IntlParamsPipe } from '../core/translate';
import { LU_PAGINATION_TRANSLATIONS } from './pagination.translate';

@Component({
	selector: 'lu-pagination',
	templateUrl: './pagination.component.html',
	imports: [IntlParamsPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
	protected intl = getIntl(LU_PAGINATION_TRANSLATIONS);

	readonly isFirstPage = input.required<boolean>();
	readonly isLastPage = input.required<boolean>();

	readonly from = input<number>();
	readonly to = input<number>();
	readonly itemsCount = input<number>();
	readonly mod = input<'default' | 'compact'>('default');

	readonly previousPage = output<void>();
	readonly nextPage = output<void>();

	constructor() {
		effect(() => {
			if (this.mod() === 'default' && (!this.from() || !this.to() || !this.itemsCount())) {
				throw new Error('Pagination in "default" mode requires "from", "to", and "itemsCount" inputs.');
			}
		});
	}
}
