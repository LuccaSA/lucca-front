import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { formatNumber, NumberFormatOptions } from './number-format.models';

@Pipe({
	name: 'luNumberFormat',
	standalone: true,
})
export class LuFormatNumberPipe implements PipeTransform {
	#locale = inject(LOCALE_ID);

	transform(value: number, options: NumberFormatOptions) {
		return formatNumber(value, this.#locale, options);
	}
}
