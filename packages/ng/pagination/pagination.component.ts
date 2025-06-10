import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_PAGINATION_TRANSLATIONS } from './pagination.translate';

@Component({
	selector: 'lu-pagination',
	templateUrl: './pagination.component.html',
	imports: [IconComponent, IntlParamsPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
	protected intl = getIntl(LU_PAGINATION_TRANSLATIONS);

	readonly isFirstPage = input.required<boolean>();
	readonly isLastPage = input.required<boolean>();

	readonly from = input<number | null>();
	readonly to = input<number | null>();
	readonly itemsCount = input<number | null>();
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
