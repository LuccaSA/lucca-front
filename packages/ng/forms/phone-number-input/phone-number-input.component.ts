import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, LOCALE_ID, output, signal, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { InputDirective, PresentationDisplayDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { type CountryCallingCode, formatIncompletePhoneNumber, getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import { CountryCode, E164Number } from './types';
import { PhoneNumberValidators } from './validators';

interface PrefixEntry {
	country: CountryCode;
	prefix: CountryCallingCode;
	name: string;
}

type ParsePhoneNumberResult = {
	number: E164Number;
	country?: CountryCode;
	nationalNumber?: string;
	isValid: boolean;
};

function tryParsePhoneNumber(phoneNumber: string, countryCode?: CountryCode): ParsePhoneNumberResult {
	try {
		const parsedNumber = parsePhoneNumber(phoneNumber, countryCode);
		return {
			country: parsedNumber.country,
			number: parsedNumber.number,
			nationalNumber: parsedNumber.formatNational(),
			isValid: parsedNumber.isValid(),
		};
	} catch {
		return {
			number: phoneNumber as E164Number,
			nationalNumber: phoneNumber,
			isValid: false,
		};
	}
}

@Component({
	selector: 'lu-phone-number-input',
	imports: [LuSimpleSelectInputComponent, FormsModule, LuDisplayerDirective, LuOptionDirective, InputDirective, PresentationDisplayDirective],
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

	readonly label = input<string>();

	readonly autocomplete = input<'off' | 'tel'>();

	/**
	 * Which countries should be shown? Defaults to empty array which means all of them.
	 *
	 * You can use CountryCode to make sure it's properly typed on your end, string is also accepted
	 */
	readonly allowedCountries = input<ReadonlyArray<CountryCode | string>>([]);

	readonly noAutoPlaceholder = input<boolean>(false);

	readonly defaultCountryCode = input<CountryCode>(undefined, { alias: 'country' });

	readonly countryChange = output<CountryCode>();

	readonly currentValue = signal<string>('');

	#onChange?: (value: E164Number) => void;

	#onTouched?: () => void;

	disabled = false;

	#displayNames = new Intl.DisplayNames(this.#locale, { type: 'region' });

	prefixEntries = getCountries()
		.map((country) => ({
			country,
			prefix: getCountryCallingCode(country),
			name: this.#displayNames.of(country),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	readonly #prefixEntries = computed(() => {
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

	countryCodeSelected = signal<CountryCode | undefined>(undefined);

	countryCode = computed(() => this.countryCodeSelected() ?? this.defaultCountryCode());

	placeholder = computed(() => {
		const exampleNumber = this.noAutoPlaceholder() === false ? getExampleNumber(this.countryCode(), examples) : undefined;
		return exampleNumber?.formatNational() ?? '';
	});

	displayedNumber = signal<string | undefined>(undefined);

	readonly prefixEntry = computed(() => this.#prefixEntries().find((p) => p.country === this.countryCode()));

	protected getPrefixKey = (prefix: PrefixEntry) => prefix?.country;

	protected prefixComparator = (a: PrefixEntry, b: PrefixEntry) => this.getPrefixKey(a) === this.getPrefixKey(b);

	writeValue(value: string): void {
		try {
			if (value) {
				const { country, number, nationalNumber } = tryParsePhoneNumber(value, this.countryCode());
				this.displayedNumber.set(nationalNumber);
				this.countryCodeSelected.set(country);
				if (value !== number) {
					this.#onChange?.(number);
				}
			} else {
				this.displayedNumber.set(undefined);
			}
		} catch {
			this.displayedNumber.set(value);
		}
		this.currentValue.set(value);
		this.formatNationalNumber();
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
		this.countryCodeSelected.set(prefixEntry.country);
		this.countryChange.emit(prefixEntry.country);
		this.touched();
		this.updateModel();
		this.formatNationalNumber();
	}

	updateNumber(number: string) {
		this.displayedNumber.set(number);
		this.updateModel();
	}

	updateModel(): void {
		const displayedNumber = this.displayedNumber();
		const countryCode = this.countryCode();

		try {
			const { country, number } = tryParsePhoneNumber(displayedNumber, countryCode);
			if (country && country !== countryCode) {
				this.countryCodeSelected.set(country);
				this.countryChange.emit(country);
			}
			this.#onChange?.(number);
			return;
		} catch {
			this.#onChange?.(displayedNumber as E164Number);
		}
	}

	touched(): void {
		this.#onTouched?.();
	}

	formatNationalNumber(): void {
		const countryCode = this.countryCode();
		const displayedNumber = this.displayedNumber();
		try {
			const { isValid, nationalNumber } = tryParsePhoneNumber(displayedNumber, countryCode);
			if (isValid) {
				this.displayedNumber.set(nationalNumber);
			} else if (countryCode) {
				this.displayedNumber.set(formatIncompletePhoneNumber(displayedNumber, countryCode));
			}
		} catch {
			// do nothing
		}
	}

	validate(control: AbstractControl<string, string>): ValidationErrors {
		return PhoneNumberValidators.validPhoneNumber(control, this.countryCode());
	}
}
