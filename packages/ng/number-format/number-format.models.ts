export type NumberFormatStyle = 'decimal' | 'currency' | 'percent' | 'unit';

export type NumberFormatUnit =
	| 'acre'
	| 'bit'
	| 'byte'
	| 'celsius'
	| 'centimeter'
	| 'day'
	| 'degree'
	| 'fahrenheit'
	| 'fluid-ounce'
	| 'foot'
	| 'gallon'
	| 'gigabit'
	| 'gigabyte'
	| 'gram'
	| 'hectare'
	| 'hour'
	| 'inch'
	| 'kilobit'
	| 'kilobyte'
	| 'kilogram'
	| 'kilometer'
	| 'liter'
	| 'megabit'
	| 'megabyte'
	| 'meter'
	| 'microsecond'
	| 'mile'
	| 'mile-scandinavian'
	| 'milliliter'
	| 'millimeter'
	| 'millisecond'
	| 'minute'
	| 'month'
	| 'nanosecond'
	| 'ounce'
	| 'percent'
	| 'petabyte'
	| 'pound'
	| 'second'
	| 'stone'
	| 'terabit'
	| 'terabyte'
	| 'week'
	| 'yard'
	| 'year';

export type NumberFormatUnitDisplay = 'short' | 'narrow' | 'long';

export type NumberFormatCurrencyDisplay = 'code' | 'symbol' | 'narrowSymbol' | 'name';

export type NumberFormatCurrencySign = 'standard' | 'accounting';

export type NumberFormatNotation = 'standard' | 'scientific' | 'engineering' | 'compact';

export type NumberFormatRoundingMode = 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';

export interface NumberFormatBaseOptions {
	style: NumberFormatStyle;
	notation?: NumberFormatNotation;
	minimumIntegerDigits?: number;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	minimumSignificantDigits?: number;
	maximumSignificantDigits?: number;
	roundingMode?: NumberFormatRoundingMode;
}

export interface FormatDecimalOptions extends NumberFormatBaseOptions {
	style: 'decimal';
}

export interface FormatUnitOptions extends NumberFormatBaseOptions {
	style: 'unit';
	unit: NumberFormatUnit;
	unitDisplay?: NumberFormatUnitDisplay;
}

export interface FormatPercentOptions extends NumberFormatBaseOptions {
	style: 'percent';
}

export interface FormatCurrencyOptions extends NumberFormatBaseOptions {
	style: 'currency';
	currency: string;
	currencyDisplay?: NumberFormatCurrencyDisplay;
	currencySign?: NumberFormatCurrencySign;
}

export type NumberFormatOptions = NumberFormatBaseOptions | FormatDecimalOptions | FormatUnitOptions | FormatPercentOptions | FormatCurrencyOptions;

export function formatNumber(value: number | null | undefined, locale: string, options: NumberFormatOptions): string {
	if (typeof value === 'number') {
		return new Intl.NumberFormat(locale, options).format(value);
	}
	return '';
}

export interface ParseNumberLookuptable {
	group: RegExp;
	decimal: RegExp;
	numeral: RegExp;
	exclude: RegExp;
	index: (v: string) => string;
}

export function createParseNumberLookuptable(locale: string): ParseNumberLookuptable {
	const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
	const numerals = [...new Intl.NumberFormat(locale, { useGrouping: false }).format(9876543210)].reverse();
	const index = new Map(numerals.map((d, i) => [d, i.toString()]));
	const groupStr = parts.find((d) => d.type === 'group').value;
	const decimalStr = parts.find((d) => d.type === 'decimal').value;
	return {
		group: new RegExp(`[${groupStr}]`, 'g'),
		decimal: new RegExp(`[${decimalStr}]`),
		numeral: new RegExp(`[${numerals.join('')}]`, 'g'),
		exclude: new RegExp(`[^${[...numerals, groupStr, decimalStr, '+', '-'].join('')}]`, 'g'),
		index: (d) => index.get(d),
	};
}

export function parseNumber(value: string, config: { locale?: string; table: ParseNumberLookuptable }): number {
	const lookupTable = config.table ?? createParseNumberLookuptable(config.locale);
	const parsedValue = value.trim().replace(lookupTable.group, '').replace(lookupTable.decimal, '.').replace(lookupTable.numeral, lookupTable.index).replace(lookupTable.exclude, '');
	return parsedValue ? +parsedValue : NaN;
}
