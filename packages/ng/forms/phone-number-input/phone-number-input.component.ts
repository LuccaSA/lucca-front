import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, LOCALE_ID, model, output, signal, untracked, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transformedValue, type FormValueControl } from '@angular/forms/signals';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { type CountryCallingCode, formatIncompletePhoneNumber, getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import { PhoneNumberInputAutocomplete } from './phone-number-input.type';
import { CountryCode, E164Number } from './types';

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
			number: phoneNumber,
			nationalNumber: phoneNumber,
			isValid: false,
		};
	}
}

@Component({
	selector: 'lu-phone-number-input',
	imports: [LuSimpleSelectInputComponent, FormsModule, LuDisplayerDirective, LuOptionDirective, InputDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './phone-number-input.component.html',
	styleUrl: './phone-number-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberInputComponent implements FormValueControl<string> {
	#locale = inject(LOCALE_ID);

	readonly label = input<string>();

	readonly autocomplete = input<PhoneNumberInputAutocomplete>();

	/**
	 * Which countries should be shown? Defaults to empty array which means all of them.
	 *
	 * You can use CountryCode to make sure it's properly typed on your end, string is also accepted
	 */
	readonly allowedCountries = input<ReadonlyArray<CountryCode | string>>([]);

	readonly noAutoPlaceholder = input<boolean>(false);

	readonly defaultCountryCode = input<CountryCode>(undefined, { alias: 'country' });

	readonly countryChange = output<CountryCode>();

	readonly value = model<string>('');

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	#displayNames = new Intl.DisplayNames(this.#locale, { type: 'region' });

	prefixEntries = getCountries()
		.map((country) => ({
			country,
			prefix: getCountryCallingCode(country),
			name: this.#displayNames.of(country),
		}))
		.sort((a, b) => a.name?.localeCompare(b.name));

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
			return entry.country.toLowerCase().includes(query.toLowerCase()) || `+${entry.prefix}`.includes(query) || entry.name?.toLowerCase().includes(query.toLowerCase());
		});
	});

	readonly countryCodeSelected = linkedSignal<string, CountryCode | undefined>({
		source: this.value,
		computation: (value, previous) => {
			if (!value) {
				return previous?.value;
			}
			return tryParsePhoneNumber(value, previous?.value ?? untracked(() => this.defaultCountryCode())).country ?? previous?.value;
		},
	});

	countryCode = computed(() => this.countryCodeSelected() ?? this.defaultCountryCode());

	placeholder = computed(() => {
		const exampleNumber = this.noAutoPlaceholder() === false ? getExampleNumber(this.countryCode(), examples) : undefined;
		return exampleNumber?.formatNational() ?? '';
	});

	readonly displayedNumber = transformedValue(this.value, {
		parse: (rawValue: string) => {
			if (!rawValue) {
				return { value: '' };
			}
			const { number, isValid } = tryParsePhoneNumber(
				rawValue,
				untracked(() => this.countryCode()),
			);
			return isValid ? { value: number } : { value: number, error: { kind: 'phoneNumber' } };
		},
		format: (value) =>
			value
				? (tryParsePhoneNumber(
						value,
						untracked(() => this.countryCode()),
					).nationalNumber ?? value)
				: '',
	});

	readonly prefixEntry = computed(() => this.#prefixEntries().find((p) => p.country === this.countryCode()));

	protected getPrefixKey = (prefix: PrefixEntry) => prefix?.country;

	protected prefixComparator = (a: PrefixEntry, b: PrefixEntry) => this.getPrefixKey(a) === this.getPrefixKey(b);

	updatePrefix(prefixEntry: PrefixEntry | null) {
		if (!prefixEntry) {
			return;
		}
		this.countryCodeSelected.set(prefixEntry.country);
		this.countryChange.emit(prefixEntry.country);
		this.touch.emit();
		this.formatNationalNumber();
	}

	updateNumber(number: string) {
		const previousCountry = untracked(() => this.countryCodeSelected());
		this.displayedNumber.set(number);
		const country = this.countryCodeSelected();
		if (country && country !== previousCountry) {
			this.countryChange.emit(country);
		}
	}

	formatNationalNumber(): void {
		const countryCode = untracked(() => this.countryCode());
		const displayedNumber = this.displayedNumber();

		if (displayedNumber) {
			const { isValid, nationalNumber } = tryParsePhoneNumber(displayedNumber, countryCode);
			if (isValid && nationalNumber) {
				this.displayedNumber.set(nationalNumber);
			} else if (countryCode) {
				this.displayedNumber.set(formatIncompletePhoneNumber(displayedNumber, countryCode));
			}
		}
	}
}
