import { formatNumber, getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'luNumber',
	pure: true,
})
export class LuNumberPipe implements PipeTransform {
	constructor(@Inject(LOCALE_ID) protected locale) {}
	transform(number: number, precision = 2, injectHtml = true) {
		const formatted = formatNumber(number, this.locale, `1.${precision}-${precision}`);
		const separator = getLocaleNumberSymbol(this.locale, NumberSymbol.Decimal);
		const split = formatted.split(separator);
		const integral = split[0];
		const decimal = split[1];
		const hideDecimal = Math.round(number) === number;
		if (precision > 0) {
			return injectHtml
				? `${integral}<span class="decimal-part${
						hideDecimal ? ' u-hidden' : ''
				  }">${separator}${decimal}</span>`
				: formatted;
		} else {
			return integral;
		}

	}
}
