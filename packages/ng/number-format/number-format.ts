import { NumberFormatOptions } from './number-format.models';

const VALUE_TYPES: Intl.NumberFormatPartTypes[] = ['integer', 'decimal', 'fraction', 'group', 'minusSign'];

const DIGIT_TYPES: Intl.NumberFormatPartTypes[] = ['integer', 'decimal', 'fraction'];

const SUFFIX_PREFIX_TYPES: Intl.NumberFormatPartTypes[] = ['percent', 'percentSign', 'currency', 'code', 'symbol', 'name', 'unit'];

export class NumberFormat {
	readonly #locale: string;
	readonly #options: Intl.NumberFormatOptions;
	readonly #focusIntlNumberFormat: Intl.NumberFormat;
	readonly #intlNumberFormat: Intl.NumberFormat;

	constructor({ locale, ...options }: NumberFormatOptions) {
		this.#locale = locale;
		this.#options = this.#applyBoundariesToDigitOptions(options);
		this.#intlNumberFormat = new Intl.NumberFormat(this.#locale, this.#options);
		this.#focusIntlNumberFormat = new Intl.NumberFormat(this.#locale, {
			...this.#options,
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

	hasMinusSignAtStart(text: string): boolean {
		return text.match(new RegExp(`^-`, 'g')) !== null;
	}

	hasDecimalAtEnd(text: string): boolean {
		return text.match(new RegExp(`[.,]$`, 'g')) !== null;
	}

	getSuffix(value: number | null): string | null {
		value = value ?? 1;

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

		const parts = this.#intlNumberFormat.formatToParts(value);
		const indexOfLastDigit = parts.findIndex((p) => DIGIT_TYPES.includes(p.type));
		const indexOfLastSuffix = parts.findIndex((p) => SUFFIX_PREFIX_TYPES.includes(p.type));
		if (indexOfLastSuffix >= 0 && indexOfLastSuffix < indexOfLastDigit) {
			return parts[indexOfLastSuffix].value;
		}
		return null;
	}

	/**
	 * Parse string to number
	 * @param text
	 */
	parse(text: string): number | null {
		const hasMinusSignAtStart = this.hasMinusSignAtStart(text);

		// Keep only digits and decimal delimiter
		text = text.replace(new RegExp(`[^.,0-9]`, 'g'), '');

		// Replace decimal delimiter by '.' before casting string to number
		text = text.replace(new RegExp(`[,]`, 'g'), '.');

		// Keep only first decimalDelimiter
		const parts = text.split('.');
		text = parts[0];
		if (parts.length > 1) {
			const fraction = parts
				.slice(1)
				.join('')
				//ignore digits above maximumFractionDigits
				.slice(0, this.#options.maximumFractionDigits ?? 2);
			text += `.${fraction}`;
		}

		if (text.trim() === '' || isNaN(+text)) {
			return null;
		}

		const value = hasMinusSignAtStart ? -text : +text;
		return this.#options.style === 'percent' ? value / 100 : value;
	}

	format(value: number | null): string {
		if (value === null) {
			return '';
		}
		return this.#intlNumberFormat.format(value);
	}

	countDecimalOccurences(text: string): number {
		return text.match(new RegExp(`[.,]`, 'g'))?.length ?? 0;
	}

	getFocusFormat(value: number | null): string {
		if (value === null) {
			return '';
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

	getBlurFormat(value: number | null): string {
		if (value === null) {
			return '';
		}
		return this.#intlNumberFormat
			.formatToParts(value)
			.filter((p) => VALUE_TYPES.includes(p.type))
			.map((p) => p.value)
			.join('');
	}
}
