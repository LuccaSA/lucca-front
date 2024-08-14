import { Pipe, PipeTransform } from '@angular/core';
import { E164Number, NumberFormat } from './types';
import { PhoneNumberFormatter } from './formatter';

@Pipe({
	name: 'phoneNumberFormat',
	standalone: true,
})
export class PhoneNumberFormatPipe implements PipeTransform {
	transform(value: E164Number, format: NumberFormat = 'NATIONAL'): unknown {
		return PhoneNumberFormatter.format(value, format);
	}
}
