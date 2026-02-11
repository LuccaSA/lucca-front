import { Pipe, PipeTransform } from '@angular/core';
import { PhoneNumberFormatter } from './formatter';
import { E164Number, NumberFormat } from './types';

@Pipe({
	name: 'luPhoneNumberFormat',
})
export class PhoneNumberFormatPipe implements PipeTransform {
	transform(value: E164Number, format: NumberFormat = 'NATIONAL'): unknown {
		return PhoneNumberFormatter.format(value, format);
	}
}
