import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luIsOptionSelected',
	standalone: true,
})
export class LuIsOptionSelectedPipe implements PipeTransform {
	transform<T>(option: T, comparer: (option1: T, option2: T) => boolean, selectedOptions: T[]): boolean {
		return selectedOptions.some((selectedOption) => comparer(option, selectedOption));
	}
}
