import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luNotSelectedOptions',
	standalone: true,
	pure: true,
})
export class LuNotSelectedOptionsPipe<T> implements PipeTransform {
	transform(groupOptions: T[], selectedOptions: T[], optionComparer: (option1: T, option2: T) => boolean): T[] {
		return groupOptions.filter((o) => !selectedOptions.some((so) => optionComparer(so, o)));
	}
}
