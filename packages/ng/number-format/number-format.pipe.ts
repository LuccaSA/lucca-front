import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormat } from './number-format';
import { NumberFormatOptions } from './number-format.models';

@Pipe({
	name: 'luNumberFormat',
})
export class LuFormatNumberPipe implements PipeTransform {
	transform(value: number, options: NumberFormatOptions) {
		return new NumberFormat(options).format(value);
	}
}
