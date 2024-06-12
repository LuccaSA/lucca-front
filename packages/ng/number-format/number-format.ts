import { canCastSplittedInputToNumber, joinSplittedInput, NumberFormatOptions, NumberFormatParsedInput, NumberFormatSplittedInput } from './number-format.models';

const VALUE_TYPES: Intl.NumberFormatPartTypes[] = ['integer', 'decimal', 'fraction', 'group', 'minusSign'];

const DIGIT_TYPES: Intl.NumberFormatPartTypes[] = ['integer', 'decimal', 'fraction'];

const SUFFIX_PREFIX_TYPES: Intl.NumberFormatPartTypes[] = ['percent', 'percentSign', 'currency', 'code', 'symbol', 'name', 'unit'];

export class NumberFormat {
	readonly locale: string;
	readonly min: number | undefined;
	readonly max: number | undefined;
	readonly options: Intl.NumberFormatOptions;
	readonly #focusIntlNumberFormat: Intl.NumberFormat;
	readonly #intlNumberFormat: Intl.NumberFormat;

	constructor({ locale, min, max, ...options }: NumberFormatOptions) {
		this.locale = locale;
		this.min = min;
		this.max = max;
		this.options = this.#applyBoundariesToDigitOptions(options);
		this.#intlNumberFormat = new Intl.NumberFormat(this.locale, this.options);
		this.#focusIntlNumberFormat = new Intl.NumberFormat(this.locale, {
			...this.options,
			minimumFractionDigits: 0,
		});
	}

	#applyBoundariesToDigitOptions({
		style,
		minimumFractionDigits,
		maximumFractionDigits,
		minimumIntegerDigits,
		minimumSignificantDigits,
		maximumSignificantDigits,
		...options
	}: Intl.NumberFormatOptions): Intl.NumberFormatOptions {
		style = style ?? 'decimal';
		// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumfractiondigits
		minimumFractionDigits = Math.min(Math.max(minimumFractionDigits ?? 0, 0), 20);
		// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumfractiondigits
		maximumFractionDigits = Math.min(Math.max(maximumFractionDigits ?? 2, minimumFractionDigits), 20);
		// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumfractiondigits
		minimumIntegerDigits = Math.min(Math.max(minimumFractionDigits ?? 1, 1), 21);
		// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#minimumsignificantdigits
		minimumSignificantDigits = Math.min(Math.max(minimumSignificantDigits ?? 1, 1), 21);
		// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#maximumsignificantdigits
		maximumSignificantDigits = Math.min(Math.max(maximumSignificantDigits ?? 21, minimumSignificantDigits), 21);
		return {
			...options,
			style,
			minimumFractionDigits,
			maximumFractionDigits,
			minimumIntegerDigits,
			minimumSignificantDigits,
			maximumSignificantDigits,
		};
	}

	getSuffix(value: number | null): string | null {
		value = value ?? 1;

		// Parts after digits are suffix
		const parts = this.#intlNumberFormat.formatToParts(value).reverse();
		const indexOfFirstDigit = parts.findIndex((p) => DIGIT_TYPES.includes(p.type));
		const indexOfFirstSuffix = parts.findIndex((p) => SUFFIX_PREFIX_TYPES.includes(p.type));
		if (indexOfFirstSuffix >= 0 && indexOfFirstSuffix < indexOfFirstDigit) {
			return parts[indexOfFirstSuffix].value;
		}
		return null;
	}

	getPrefix(value: number | null): string | null {
		value = value ?? 1;

		// Parts before digits are prefix
		const parts = this.#intlNumberFormat.formatToParts(value);
		const indexOfLastDigit = parts.findIndex((p) => DIGIT_TYPES.includes(p.type));
		const indexOfLastSuffix = parts.findIndex((p) => SUFFIX_PREFIX_TYPES.includes(p.type));
		if (indexOfLastSuffix >= 0 && indexOfLastSuffix < indexOfLastDigit) {
			return parts[indexOfLastSuffix].value;
		}
		return null;
	}

	applyRange(value: number | null): number | null {
		if (value === null) {
			return null;
		}
		if (this.min !== undefined) {
			value = Math.max(this.min, value);
		}
		if (this.max !== undefined) {
			value = Math.min(this.max, value);
		}
		return value;
	}

	#parseAndSplitInput(input: string): NumberFormatSplittedInput {
		let minusSign = /^-/g.exec(input)?.[0] ?? '';
		// if minus sign has been input but range only allows positive values, remove it
		if (this.min >= 0) {
			minusSign = '';
		}

		// Add minus sign by default if range only allows negative values
		if (this.max < 0) {
			minusSign = '-';
		}

		// Keep only digits and decimal delimiter
		input = input.replace(/[^.,0-9]/g, '');

		// Replace decimal delimiter ',' by '.' before casting string to number
		input = input.replace(/,/g, '.');

		const parts = input.split('.');
		const integer = parts[0];
		const fraction = parts
			.slice(1)
			.join('')
			//ignore digits above maximumFractionDigits
			.slice(0, this.options.maximumFractionDigits ?? 2);
		const delimiter = parts.length > 1 ? '.' : '';

		const splittedInput: NumberFormatSplittedInput = {
			minusSign,
			integer,
			delimiter,
			fraction,
		};

		// cast input in number only if it has integer or fraction
		if (canCastSplittedInputToNumber(splittedInput)) {
			const value = +joinSplittedInput(splittedInput);

			// if value is not in range, fix it and split again !
			const valueInRange = this.applyRange(value);
			if (value !== valueInRange) {
				return this.#parseAndSplitInput(this.getFocusFormat(valueInRange));
			}
		}

		return splittedInput;
	}

	parse(input: string): NumberFormatParsedInput {
		const splittedInput = this.#parseAndSplitInput(input);
		const cleanInput = joinSplittedInput(splittedInput);
		let value: number | null = null;

		if (canCastSplittedInputToNumber(splittedInput)) {
			value = +joinSplittedInput(splittedInput);
			if (this.options.style === 'percent') {
				value /= 100;
				value = +value.toFixed(this.options.maximumFractionDigits + 2);
			}
		}
		return {
			splittedInput,
			cleanInput,
			value,
		};
	}

	format(value: number | null): string {
		if (value === null) {
			return '';
		}
		return this.#intlNumberFormat.format(value);
	}

	getFocusFormat(value: number | undefined | null): string {
		if (value === null || value === undefined || isNaN(value)) {
			// Add minus sign by default if range only allows negative values
			return this.max < 0 ? '-' : '';
		}
		const parts = this.#focusIntlNumberFormat.formatToParts(value);
		const minusSign = parts.find((p) => p.type === 'minusSign')?.value ?? '';
		const integerPart = parts
			.filter((p) => p.type === 'integer')
			.map((p) => p.value)
			.join('');
		const decimal = parts.find((p) => p.type === 'decimal') ? '.' : '';
		const fractionPart = parts
			.filter((p) => p.type === 'fraction')
			.map((p) => p.value)
			.join('');

		return `${minusSign}${integerPart}${decimal}${fractionPart}`;
	}

	getBlurFormat(value: number | undefined | null): string {
		if (value === null || value === undefined) {
			return '';
		}
		return this.#intlNumberFormat
			.formatToParts(value)
			.filter((p) => VALUE_TYPES.includes(p.type))
			.map((p) => p.value)
			.join('');
	}
}
