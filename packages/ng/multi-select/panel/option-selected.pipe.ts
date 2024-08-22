import { Pipe, PipeTransform, inject } from '@angular/core';
import { LuOptionComparer } from '@lucca-front/ng/core-select';
import { ɵIsSelectedStrategy } from '../select.model';

@Pipe({
	name: 'luIsOptionSelected',
	standalone: true,
})
export class LuIsOptionSelectedPipe<T> implements PipeTransform {
	#selectionStrategy = inject<ɵIsSelectedStrategy<T>>(ɵIsSelectedStrategy);

	transform(option: T, comparer: LuOptionComparer<T>, selectedOptions: T[]): boolean {
		return this.#selectionStrategy.isSelected(option, selectedOptions, comparer);
	}
}
