import { Pipe, PipeTransform } from '@angular/core';
import { LuOptionComparer } from '@lucca-front/ng/core-select';

@Pipe({
	name: 'luIsOptionSelected',
	standalone: true,
})
export class LuIsOptionSelectedPipe implements PipeTransform {
	transform<T>(option: T, comparer: LuOptionComparer<T>, selectedOption: T): boolean {
		return !!selectedOption && comparer(option, selectedOption);
	}
}
