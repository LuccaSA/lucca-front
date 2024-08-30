import { E164Number, NumberFormat } from './types';
import { parsePhoneNumber } from 'libphonenumber-js';

export class PhoneNumberFormatter {
	static format(phoneNumber: E164Number, format: NumberFormat = 'NATIONAL'): string {
		return parsePhoneNumber(phoneNumber).format(format);
	}
}
