import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'luRemoveDiacritics' })
export class LuDummyRemoveDiacriticsPipe implements PipeTransform {

	constructor() { }

	public transform(value: any): string {
		return value;
	}

}
