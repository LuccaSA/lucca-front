import { NumberFormat } from './number-format';
import { NumberFormatCurrencyDisplay, NumberFormatStyle, NumberFormatUnit, NumberFormatUnitDisplay } from './number-format.models';

const LOCALE_FR = 'fr-fr';
const LOCALE_US = 'en-us';

interface ParseTestData {
	style?: NumberFormatStyle;
	min?: number | undefined;
	max?: number | undefined;
	input: string;
	cleanInput: string;
	value: number | null;
}

const parseTests: ParseTestData[] = [
	{
		input: '123456',
		cleanInput: '123456',
		value: 123456,
	},
	// By default, max fraction digits is 2
	{
		input: '123.456',
		cleanInput: '123.45',
		value: 123.45,
	},
	// Empty input is parsed as null
	{
		input: '',
		cleanInput: '',
		value: null,
	},
	// Minus sign is kept even if no digits come after
	// To allow user to pursue without losing the sign
	{
		input: '-',
		cleanInput: '-',
		value: null,
	},
	// Decimal delimiter is kept even if no digits come after
	// To allow user to pursue without losing the delimiter
	{
		input: '.',
		cleanInput: '.',
		value: null,
	},
	{
		input: '5.',
		cleanInput: '5.',
		value: 5,
	},
	// Previous rules can be combined
	{
		input: '-.',
		cleanInput: '-.',
		value: null,
	},
	{
		input: '-.-',
		cleanInput: '-.',
		value: null,
	},
	{
		input: '.-.',
		cleanInput: '.',
		value: null,
	},
	// Minus sign is only allowed at the beginning of the input
	// It will be cleaned out
	{
		input: '5-',
		cleanInput: '5',
		value: 5,
	},
	// Significant zeros are kept to handle following typing
	// first 5.0, then 5.01
	{
		input: '5.0',
		cleanInput: '5.0',
		value: 5,
	},
	{
		input: '5.000',
		cleanInput: '5.00',
		value: 5,
	},
	// Only the first decimal delimiter will be used
	{
		input: '123.456.789',
		cleanInput: '123.45',
		value: 123.45,
	},
];

const percentParseTests: ParseTestData[] = [
	// Percent is divided by 100
	{
		input: '123',
		cleanInput: '123',
		value: 1.23,
	},
	{
		input: '5',
		cleanInput: '5',
		value: 0.05,
	},
	{
		input: '0.05',
		cleanInput: '0.05',
		value: 0.0005,
	},
];

const minMaxTests: ParseTestData[] = [
	{
		style: 'decimal',
		input: '5',
		min: -10,
		max: 10,
		cleanInput: '5',
		value: 5,
	},
	{
		style: 'percent',
		input: '5',
		min: -0.1,
		max: 0.1,
		cleanInput: '5',
		value: 0.05,
	},
	{
		style: 'decimal',
		input: '-15',
		min: -10,
		max: 10,
		cleanInput: '-10',
		value: -10,
	},
	{
		style: 'percent',
		input: '-15',
		min: -0.1,
		max: 0.1,
		cleanInput: '-10',
		value: -0.1,
	},
	{
		style: 'decimal',
		input: '15',
		min: -10,
		max: 10,
		cleanInput: '10',
		value: 10,
	},
	{
		style: 'percent',
		input: '15',
		min: -0.1,
		max: 0.1,
		cleanInput: '10',
		value: 0.1,
	},
	// If values can only be negative, add minus sign by default
	{
		style: 'decimal',
		input: '',
		min: -10,
		max: -5,
		cleanInput: '-',
		value: null,
	},
];

interface SuffixPrefixTestData {
	locale: string;
	style: NumberFormatStyle;
	currency?: string;
	currencyDisplay?: NumberFormatCurrencyDisplay;
	unit?: NumberFormatUnit;
	unitDisplay?: NumberFormatUnitDisplay;
	value: number | null;
	suffix: string | null;
	prefix: string | null;
}

const suffixPrefixCurrencyTests: SuffixPrefixTestData[] = [
	{
		locale: LOCALE_FR,
		style: 'currency',
		value: 5,
		currency: 'EUR',
		currencyDisplay: 'symbol',
		prefix: null,
		suffix: '€',
	},
	{
		locale: LOCALE_FR,
		style: 'currency',
		value: 5,
		currency: 'EUR',
		currencyDisplay: 'name',
		prefix: null,
		suffix: 'euros',
	},
	{
		locale: LOCALE_US,
		style: 'currency',
		value: 5,
		currency: 'USD',
		currencyDisplay: 'symbol',
		prefix: '$',
		suffix: null,
	},
	{
		locale: LOCALE_US,
		style: 'currency',
		value: 5,
		currency: 'USD',
		currencyDisplay: 'name',
		prefix: null,
		suffix: 'US dollars',
	},
];

const suffixPrefixUnitTests: SuffixPrefixTestData[] = [
	{
		locale: LOCALE_US,
		style: 'unit',
		value: 5,
		unit: 'kilometer',
		unitDisplay: 'short',
		prefix: null,
		suffix: 'km',
	},
	{
		locale: LOCALE_US,
		style: 'unit',
		value: 5,
		unit: 'kilometer',
		unitDisplay: 'long',
		prefix: null,
		suffix: 'kilometers',
	},
];

const suffixPrefixPercentTests: SuffixPrefixTestData[] = [
	{
		locale: LOCALE_US,
		style: 'percent',
		value: 5,
		prefix: null,
		suffix: '%',
	},
];

interface FormatTestData {
	value: number | null;
	formatted: string;
}

const focusFormatTests: FormatTestData[] = [
	{
		value: null,
		formatted: '',
	},
	{
		value: 0,
		formatted: '0',
	},
	{
		value: 123245.5,
		formatted: '123245.5',
	},
	{
		value: -123245.5,
		formatted: '-123245.5',
	},
	{
		value: 123245.12345,
		formatted: '123245.12345',
	},
];

const blurFormatTests: FormatTestData[] = [
	{
		value: null,
		formatted: '',
	},
	{
		value: 0,
		formatted: '0',
	},
	{
		value: 123245.5,
		formatted: '123 245,5',
	},
	{
		value: -123245.5,
		formatted: '−123 245,5',
	},
	{
		value: 123245.12345,
		formatted: '123 245,12345',
	},
];

describe('NumberFormat', () => {
	it.each<ParseTestData>(parseTests)("should parse '$input' to $value and clean to '$cleanInput'", ({ input, cleanInput, value }) => {
		const numberFormat = new NumberFormat({ locale: LOCALE_FR, style: 'decimal' });

		const parsedInput = numberFormat.parse(input);
		expect(parsedInput.cleanInput).toBe(cleanInput);
		expect(parsedInput.value).toBe(value);
	});
	it.each<ParseTestData>(percentParseTests)("should parse percent '$input' to $value and clean to '$cleanInput'", ({ input, cleanInput, value }) => {
		const numberFormat = new NumberFormat({ locale: LOCALE_FR, style: 'percent' });

		const parsedInput = numberFormat.parse(input);
		expect(parsedInput.cleanInput).toBe(cleanInput);
		expect(parsedInput.value).toBe(value);
	});

	it.each<ParseTestData>(minMaxTests)(
		"with range '$min' to '$max', and style '$style', should parse '$input' to $value and clean to '$cleanInput'",
		({ min, max, input, cleanInput, value, style }) => {
			const numberFormat = new NumberFormat({ locale: LOCALE_FR, style, min, max });

			const parsedInput = numberFormat.parse(input);
			expect(parsedInput.cleanInput).toBe(cleanInput);
			expect(parsedInput.value).toBe(value);
		},
	);

	it.each<SuffixPrefixTestData>(suffixPrefixCurrencyTests)(
		"with currency '$currency' and display '$currencyDisplay', '$value' should get prefix '$prefix' and suffix '$suffix'",
		({ locale, style, suffix, prefix, value, unit, unitDisplay, currencyDisplay, currency }) => {
			const numberFormat = new NumberFormat({ locale, style, unit, unitDisplay, currencyDisplay, currency });

			expect(numberFormat.getPrefix(value)).toBe(prefix);
			expect(numberFormat.getSuffix(value)).toBe(suffix);
		},
	);

	it.each<SuffixPrefixTestData>(suffixPrefixUnitTests)(
		"with unit 'unit' and display '$unitDisplay', '$value' should get prefix '$prefix' and suffix '$suffix'",
		({ locale, style, suffix, prefix, value, unit, unitDisplay, currencyDisplay, currency }) => {
			const numberFormat = new NumberFormat({ locale, style, unit, unitDisplay, currencyDisplay, currency });

			expect(numberFormat.getPrefix(value)).toBe(prefix);
			expect(numberFormat.getSuffix(value)).toBe(suffix);
		},
	);

	it.each<SuffixPrefixTestData>(suffixPrefixPercentTests)(
		"with percent, '$value' should get prefix '$prefix' and suffix '$suffix'",
		({ locale, style, suffix, prefix, value, unit, unitDisplay, currencyDisplay, currency }) => {
			const numberFormat = new NumberFormat({ locale, style, unit, unitDisplay, currencyDisplay, currency });

			expect(numberFormat.getPrefix(value)).toBe(prefix);
			expect(numberFormat.getSuffix(value)).toBe(suffix);
		},
	);

	it.each<FormatTestData>(focusFormatTests)("should format '$value' for focus into '$formatted'", ({ value, formatted }) => {
		const numberFormat = new NumberFormat({ locale: LOCALE_FR, style: 'decimal' });

		expect(numberFormat.getFocusFormat(value)).toBe(formatted);
	});

	it.each<FormatTestData>(blurFormatTests)("should format '$value' for blur into '$formatted'", ({ value, formatted }) => {
		const numberFormat = new NumberFormat({ locale: LOCALE_FR, style: 'decimal' });

		expect(numberFormat.getBlurFormat(value)).toBe(formatted);
	});
});
