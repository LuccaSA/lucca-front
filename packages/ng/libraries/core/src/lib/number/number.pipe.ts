import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luNumber',
	pure: true,
})
export class LuNumberPipe implements PipeTransform {
	transform(number: number) {
		return `<b>${number}</b>`;
	}
}
