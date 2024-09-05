import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, Input, input, output, LOCALE_ID, signal, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { type CountryCallingCode, formatIncompletePhoneNumber, getCountries, getCountryCallingCode, NationalNumber, parsePhoneNumber } from 'libphonenumber-js';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { CountryCode, E164Number } from './types';
import { PhoneNumberValidators } from './validators';

interface PrefixEntry {
	country: CountryCode;
	prefix: CountryCallingCode;
	name: string;
}

type ParsePhoneNumberResult = {
	country: CountryCode;
	number: E164Number;
	nationalNumber: NationalNumber;
	formatInternational: string;
	formatNational: string;
	isValid: boolean;
	isPossible: boolean;
};

function getParsePhoneNumberResult(phoneNumber: string, countryCode?: CountryCode): ParsePhoneNumberResult {
	const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
	return {
		country: parsedNumber.country,
		number: parsedNumber.number,
		nationalNumber: parsedNumber.nationalNumber,
		formatInternational: parsedNumber.formatInternational(),
		formatNational: parsedNumber.formatNational(),
		isValid: parsedNumber.isValid(),
		isPossible: parsedNumber.isPossible(),
	};
}

@Component({
	selector: 'lu-phone-number-input',
	standalone: true,
	imports: [LuSimpleSelectInputComponent, TextInputComponent, FormsModule, LuDisplayerDirective, LuOptionDirective, InputDirective, FormFieldComponent],
	templateUrl: './phone-number-input.component.html',
	styleUrl: './phone-number-input.component.scss',
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
	#locale = inject(LOCALE_ID);

	@Input() label: string;

	#onChange?: (value: E164Number) => void;

	#onTouched?: () => void;

	disabled = false;

	#displayNames = new Intl.DisplayNames(this.#locale, { type: 'region' });

	prefixEntries = getCountries().map((country) => ({
		country,
		prefix: getCountryCallingCode(country),
		name: this.#displayNames.of(country),
	}));

	/**
	 * Which countries should be shown? Defaults to empty array which means all of them.
	 *
	 * You can use CountryCode to make sure it's properly typed on your end, string is also accepted
	 */
	allowedCountries = input<Array<CountryCode | string>>([]);

	#prefixEntries = computed(() => {
		const whitelist = this.allowedCountries();
		if (whitelist.length === 0) {
			return this.prefixEntries;
		}
		return this.prefixEntries.filter((e) => whitelist.includes(e.country));
	});

	query = signal('');

	protected prefixesDisplay = computed(() => {
		const query = this.query();
		if (query === '') {
			return this.#prefixEntries();
		}
		return this.#prefixEntries().filter((entry) => {
			return entry.country.toLowerCase().includes(query.toLowerCase()) || `+${entry.prefix}`.includes(query) || entry.name.toLowerCase().includes(query.toLowerCase());
		});
	});

	countryCodeInput = input<CountryCode>(undefined, { alias: 'country' });

	countryChange = output<CountryCode>();

	countryCodeSelected = signal<CountryCode | undefined>(undefined);

	countryCode = computed(() => this.countryCodeSelected() ?? this.countryCodeInput());

	nationalNumber = signal<string | undefined>(undefined);

	e164Number = signal<E164Number | undefined>(undefined);

	prefixEntry = computed(() => this.#prefixEntries().find((p) => p.country === this.countryCode()));

	protected getPrefixKey = (prefix: PrefixEntry) => prefix?.country;

	protected prefixComparator = (a: PrefixEntry, b: PrefixEntry) => this.getPrefixKey(a) === this.getPrefixKey(b);

	writeValue(value: string): void {
		try {
			if (value) {
				const { country, number, formatNational } = getParsePhoneNumberResult(value, this.countryCode());
				this.nationalNumber.set(formatNational);
				this.e164Number.set(number);
				this.countryCodeSelected.set(country);
				if (value !== number) {
					this.#onChange?.(number);
				}
			} else {
				this.nationalNumber.set(undefined);
			}
		} catch (e) {
			this.nationalNumber.set(value);
			// do nothing
		}
	}

	registerOnChange(fn: (value: E164Number) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	updatePrefix(prefixEntry: PrefixEntry) {
		if (prefixEntry.country === this.countryCode()) {
			return;
		}
		this.countryCodeSelected.set(prefixEntry.country);
		this.countryChange.emit(prefixEntry.country);
		this.updateModel();
	}

	updateNumber(number: string) {
		this.nationalNumber.set(number);
		this.updateModel();
	}

	updateModel(): void {
		const currentNationalNumber = this.nationalNumber();
		try {
			const countryCode = this.countryCode();
			const { country, number, formatNational, isValid } = getParsePhoneNumberResult(currentNationalNumber, countryCode);
			if (country !== countryCode) {
				this.countryCodeSelected.set(country);
				this.countryChange.emit(country);
			}
			this.e164Number.set(number);
			if (isValid) {
				this.nationalNumber.set(formatNational);
			} else if (countryCode) {
				this.nationalNumber.set(formatIncompletePhoneNumber(currentNationalNumber, countryCode));
			}
			this.#onChange?.(number);
		} catch (e) {
			this.#onChange?.(this.nationalNumber() as E164Number);
		}
	}

	touched(): void {
		this.#onTouched?.();
	}

	formatNationalNumber(): void {
		const countryCode = this.countryCode();
		try {
			const { isValid, formatNational } = getParsePhoneNumberResult(this.e164Number(), countryCode);
			if (isValid) {
				this.nationalNumber.set(formatNational);
			} else if (countryCode) {
				this.nationalNumber.set(formatIncompletePhoneNumber(this.nationalNumber(), countryCode));
			}
		} catch (e) {
			// do nothing
		}
	}

	validate(control: AbstractControl<string, string>): ValidationErrors {
		return PhoneNumberValidators.validPhoneNumber(control, this.countryCode());
	}
}
