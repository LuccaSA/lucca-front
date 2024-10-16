import { Pipe, PipeTransform, inject } from '@angular/core';
import { ɵIsSelectedStrategy } from '../select.model';

@Pipe({
	name: 'luOptionsGroupContext',
	standalone: true,
	pure: true,
})
export class LuOptionsGroupContextPipe<T> implements PipeTransform {
	#selectionStrategy = inject<ɵIsSelectedStrategy<T>>(ɵIsSelectedStrategy);

	transform(groupOptions: T[], selectedOptions: T[], optionComparer: (option1: T, option2: T) => boolean): { notSelectedOptions: T[]; isGroupSelected: boolean } {
		const notSelectedOptions = groupOptions.filter((o) => !selectedOptions.some((so) => optionComparer(so, o)));

		return {
			notSelectedOptions,
			isGroupSelected: this.#selectionStrategy.isGroupSelected(groupOptions, notSelectedOptions),
		};
	}
}
