import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatConfig } from './number-format.models';
import { NumberFormat } from './number-format';

@Pipe({
	name: 'luNumberFormat',
	standalone: true,
})
export class LuFormatNumberPipe implements PipeTransform {
	transform(value: number, config: NumberFormatConfig) {
		return new NumberFormat(config).format(value);
	}
}
