import { formatNumber, getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luNumber',
	pure: true,
})
export class LuNumberPipe implements PipeTransform {
	constructor(@Inject(LOCALE_ID) protected locale: string) {}
	transform(number: number, precision = 2) {
		const formatted = formatNumber(number, this.locale, `1.${precision}-${precision}`);
		const separator = getLocaleNumberSymbol(this.locale, NumberSymbol.Decimal);
		const split = formatted.split(separator);
		const integral = split[0];
		const decimal = split[1];

		if (precision > 0) {
			return `${integral}${separator}${decimal}`;
		} else {
			return integral;
		}
	}
}
