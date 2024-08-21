import { ChangeDetectionStrategy, Component, computed, forwardRef, Input, input, signal, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CountryCallingCode, getCountries, getCountryCallingCode, isValidPhoneNumber, parsePhoneNumber, PhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js';
import { TextInputComponent } from '../text-input/text-input.component';
import { CountryCode, E164Number, ValidatePhoneNumberLengthResult } from './types';
import { PhoneNumberValidators } from './validators';

interface PrefixEntry {
	country: CountryCode;
	prefix: CountryCallingCode;
}

const PREFIX_ENTRIES = getCountries().map((country) => ({
	country,
	prefix: getCountryCallingCode(country),
}));

@Component({
	selector: 'lu-phone-number-input',
	standalone: true,
	imports: [LuSimpleSelectInputComponent, TextInputComponent, FormsModule, LuDisplayerDirective, LuOptionDirective, InputDirective, FormFieldComponent],
	templateUrl: './phone-number-input.component.html',
	styleUrl: './phone-number-input.component.scss',
	// TODO We need to plug in aria stuff
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PhoneNumberInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => PhoneNumberInputComponent),
			multi: true,
		},
	],
})
export class PhoneNumberInputComponent implements ControlValueAccessor, Validator {
	@Input() label: string;

	#onChange?: (value: E164Number | ValidatePhoneNumberLengthResult) => void;

	#onTouched?: () => void;

	disabled = false;

	/**
	 * Which countries should be shown? Defaults to empty array which means all of them.
	 *
	 * You can use CountryCode to make sure it's properly typed on your end, string is also accepted
	 */
	allowedCountries = input<Array<CountryCode | string>>([]);

	#prefixEntries = computed(() => {
		const whitelist = this.allowedCountries();
		if (whitelist.length === 0) {
			return PREFIX_ENTRIES;
		}
		return PREFIX_ENTRIES.filter((e) => whitelist.includes(e.country));
	});

	query = signal('');

	protected prefixesDisplay = computed(() => {
		const query = this.query();
		if (query === '') {
			return this.#prefixEntries();
		}
		return this.#prefixEntries().filter((entry) => {
			return entry.country.toLowerCase().includes(query.toLowerCase()) || entry.prefix.includes(query);
		});
	});

	nationalNumber: string;

	prefixEntry: PrefixEntry;

	parsedPhoneNumber: PhoneNumber;

	protected getPrefixKey = (prefix: PrefixEntry) => prefix.country;

	protected prefixComparator = (a: PrefixEntry, b: PrefixEntry) => this.getPrefixKey(a) === this.getPrefixKey(b);

	writeValue(value: string): void {
		if (value) {
			this.parsedPhoneNumber = parsePhoneNumber(value);
			this.prefixEntry = this.#prefixEntries().find((p) => p.country === this.parsedPhoneNumber.country);
			this.nationalNumber = this.parsedPhoneNumber.nationalNumber;
		} else {
			delete this.nationalNumber;
			delete this.prefixEntry;
		}
	}

	registerOnChange(fn: (value: E164Number | ValidatePhoneNumberLengthResult) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	updateModel(): void {
		const invalidPhoneNumberReason = validatePhoneNumberLength(this.nationalNumber, this.prefixEntry.country);
		if (invalidPhoneNumberReason) {
			this.#onChange?.(invalidPhoneNumberReason);
		} else {
			if (isValidPhoneNumber(this.nationalNumber)) {
				const country = parsePhoneNumber(this.nationalNumber).country;
				if (country !== this.prefixEntry?.country) {
					this.prefixEntry = this.#prefixEntries().find((p) => p.country === country);
				}
			}
			this.parsedPhoneNumber = parsePhoneNumber(this.nationalNumber, this.prefixEntry.country);
			this.#onChange?.(this.parsedPhoneNumber.number);
		}
	}

	touched(): void {
		this.#onTouched?.();
	}

	formatNationalNumber(): void {
		// TODO: Should we revert format on focus for better edit UX?
		try {
			if (isValidPhoneNumber(this.nationalNumber, this.prefixEntry.country)) {
				this.nationalNumber = this.parsedPhoneNumber?.formatNational();
			}
		} catch (e) {
			console.error(e);
		}
	}

	validate(control: AbstractControl<string, string>): ValidationErrors {
		return PhoneNumberValidators.validPhoneNumber(control);
	}
}
