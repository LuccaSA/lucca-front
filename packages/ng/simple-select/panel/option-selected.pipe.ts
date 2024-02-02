import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luIsOptionSelected',
	standalone: true,
})
export class LuIsOptionSelectedPipe implements PipeTransform {
	transform<T>(option: T, comparer: (option1: T, option2: T) => boolean, selectedOption: T): boolean {
		return comparer(option, selectedOption);
	}
}
