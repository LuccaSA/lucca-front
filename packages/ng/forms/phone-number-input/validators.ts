import { AbstractControl } from '@angular/forms';
import { ValidatePhoneNumberLengthResult } from './types';
import { validatePhoneNumberLength } from 'libphonenumber-js';

const INVALID_FLAGS: ValidatePhoneNumberLengthResult[] = ['INVALID_COUNTRY', 'NOT_A_NUMBER', 'TOO_SHORT', 'TOO_LONG', 'INVALID_LENGTH'];

export class PhoneNumberValidators {
	static validPhoneNumber(control: AbstractControl<string>) {
		if (control.value) {
			// First, we check if current value is an invalid flag
			if (INVALID_FLAGS.includes(control.value as ValidatePhoneNumberLengthResult)) {
				return {
					validPhoneNumber: control.value as ValidatePhoneNumberLengthResult,
				};
			}
			// Then we check if current value is invalid, which can happen if it was set from server
			// Note that validatePhoneNumberLength returns an error or undefined
			const validationError = validatePhoneNumberLength(control.value);
			if (validationError) {
				return {
					validPhoneNumber: validationError,
				};
			}
		}
		// Else, everything is fine !
		return null;
	}
}
