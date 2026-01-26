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

	readonly isFirstPage = input(false, { transform: booleanAttribute });
	readonly isLastPage = input(false, { transform: booleanAttribute });

	readonly from = input<number | null>();
	readonly to = input<number | null>();
	readonly itemsCount = input<number | null>();
	readonly mod = input<'default' | 'compact'>('default');

	readonly previousPage = output<void>();
	readonly nextPage = output<void>();

	constructor() {
		effect(() => {
			if (this.mod() === 'default' && (this.from() === null || this.to() === null || this.itemsCount() === null)) {
				throw new Error('Pagination in "default" mode requires "from", "to", and "itemsCount" inputs.');
			}
		});
	}
}
