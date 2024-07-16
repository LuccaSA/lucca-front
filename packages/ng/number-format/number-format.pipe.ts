import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatOptions } from './number-format.models';
import { NumberFormat } from './number-format';

@Pipe({
	name: 'luNumberFormat',
	standalone: true,
})
export class LuFormatNumberPipe implements PipeTransform {
	transform(value: number, options: NumberFormatOptions) {
		return new NumberFormat(options).format(value);
	}
}
