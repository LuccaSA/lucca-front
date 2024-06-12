import { NumberFormat } from './number-format';
import { NumberFormatStyle } from './number-format.models';

const LOCALE_FR = 'fr-fr';

interface ParseTestData {
	locale: string;
	min?: number | undefined;
	max?: number | undefined;
	style: NumberFormatStyle;
	input: string;
	cleanInput: string;
	value: number | null;
}

const parseTests: ParseTestData[] = [
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '123456',
		cleanInput: '123456',
		value: 123456,
	},
	// By default, max fraction digits is 2
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '123.456',
		cleanInput: '123.45',
		value: 123.45,
	},
	// Empty input is parsed as null
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '',
		cleanInput: '',
		value: null,
	},
	// Minus sign is kept even if no digits come after
	// To allow user to pursue without losing the sign
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '-',
		cleanInput: '-',
		value: null,
	},
	// Decimal delimiter is kept even if no digits come after
	// To allow user to pursue without losing the delimiter
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '.',
		cleanInput: '.',
		value: null,
	},
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '5.',
		cleanInput: '5.',
		value: 5,
	},
	// Previous rules can be combined
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '-.',
		cleanInput: '-.',
		value: null,
	},
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '-.-',
		cleanInput: '-.',
		value: null,
	},
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '.-.',
		cleanInput: '.',
		value: null,
	},
	// Minus sign is only allowed at the beginning of the input
	// It will be cleaned out
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '5-',
		cleanInput: '5',
		value: 5,
	},
	// Significant zeros are kept to handle following typing
	// first 5.0, then 5.01
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '5.0',
		cleanInput: '5.0',
		value: 5,
	},
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '5.000',
		cleanInput: '5.00',
		value: 5,
	},
	// Only the first decimal delimiter will be used
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '123.456.789',
		cleanInput: '123.45',
		value: 123.45,
	},
	// Percent is divided by 100
	{
		locale: LOCALE_FR,
		style: 'percent',
		input: '123',
		cleanInput: '123',
		value: 1.23,
	},
	{
		locale: LOCALE_FR,
		style: 'percent',
		input: '5',
		cleanInput: '5',
		value: 0.05,
	},
	{
		locale: LOCALE_FR,
		style: 'percent',
		input: '0.05',
		cleanInput: '0.05',
		value: 0.0005,
	},
];

const minMaxTests: ParseTestData[] = [
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '5',
		min: -10,
		max: 10,
		cleanInput: '5',
		value: 5,
	},
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '-15',
		min: -10,
		max: 10,
		cleanInput: '-10',
		value: -10,
	},
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '15',
		min: -10,
		max: 10,
		cleanInput: '10',
		value: 10,
	},
	// If values can only be negative, add minus sign by default
	{
		locale: LOCALE_FR,
		style: 'decimal',
		input: '',
		min: -10,
		max: -5,
		cleanInput: '-',
		value: null,
	},
];

describe('NumberFormat', () => {
	it.each<ParseTestData>(parseTests)("should parse '$input' to $value and clean to '$cleanInput'", ({ locale, style, input, cleanInput, value }) => {
		const numberFormat = new NumberFormat({ locale, style });

		const parsedInput = numberFormat.parse(input);
		expect(parsedInput.cleanInput).toBe(cleanInput);
		expect(parsedInput.value).toBe(value);
	});

	it.each<ParseTestData>(minMaxTests)("with range '$min' to '$max' should parse '$input' to $value and clean to '$cleanInput'", ({ locale, min, max, style, input, cleanInput, value }) => {
		const numberFormat = new NumberFormat({ locale, style, min, max });

		const parsedInput = numberFormat.parse(input);
		expect(parsedInput.cleanInput).toBe(cleanInput);
		expect(parsedInput.value).toBe(value);
	});
});
