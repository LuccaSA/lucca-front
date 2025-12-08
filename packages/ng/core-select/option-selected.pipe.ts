import { Pipe, PipeTransform, inject } from '@angular/core';
import { LuOptionComparer, ɵIsSelectedStrategy } from './select.model';

@Pipe({
	name: 'luIsOptionSelected',
})
export class LuIsOptionSelectedPipe<T> implements PipeTransform {
	#selectionStrategy = inject<ɵIsSelectedStrategy<T>>(ɵIsSelectedStrategy);

	transform(option: T, comparer: LuOptionComparer<T>, selectedOptions: T[]): boolean {
		return this.#selectionStrategy.isSelected(option, selectedOptions, comparer);
	}
}
