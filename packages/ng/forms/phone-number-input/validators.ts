import { AbstractControl } from '@angular/forms';
import { validatePhoneNumberLength, isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

export class PhoneNumberValidators {
	static validPhoneNumber(control: AbstractControl<string>, countryCode?: CountryCode) {
		if (control.value) {
			const reason = validatePhoneNumberLength(control.value, countryCode);
			if (reason) {
				return { validPhoneNumber: reason };
			}
			if (!isValidPhoneNumber(control.value, countryCode)) {
				return { validPhoneNumber: 'INVALID' };
			}
		}
		// Else, everything is fine !
		return null;
	}
}
