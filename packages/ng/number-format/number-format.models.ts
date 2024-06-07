// Based on Intl number input
// (more info: https://dm4t2.github.io/)

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

export interface NumberFormatRange {
	min?: number;
	max?: number;
}

export interface NumberFormatOptions {
	style?: string | undefined;
	currency?: string | undefined;
	useGrouping?: boolean | undefined;
	minimumIntegerDigits?: number | undefined;
	minimumFractionDigits?: number | undefined;
	maximumFractionDigits?: number | undefined;
	minimumSignificantDigits?: number | undefined;
	maximumSignificantDigits?: number | undefined;
	unit?: NumberFormatUnit | undefined;
	unitDisplay?: NumberFormatUnitDisplay | undefined;
	currencyDisplay?: NumberFormatCurrencyDisplay | undefined;
}

export interface NumberFormatConfig {
	/**
	 * A {@link https://tools.ietf.org/html/bcp47|BCP 47} language tag.
	 * Default value is `undefined` (use the default locale of the Browser)
	 *
	 * @example `"en"` or `"de-DE"`
	 */
	locale: string;
	/**
	 * The format style to use.
	 * Default value is `"decimal"`.
	 */
	style?: NumberFormatStyle;
	/**
	 * A {@link https://en.wikipedia.org/wiki/ISO_4217|ISO 4217} currency code, which is required when using {@link NumberFormatStyle.Currency}.
	 *
	 * @example `"EUR"`
	 */
	currency?: string;
	/**
	 * How to display the currency when using {@link NumberFormatStyle.Currency}.
	 */
	currencyDisplay?: NumberFormatCurrencyDisplay;
	/**
	 * A {@link https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier|unit identifier}, which is required when using {@link NumberFormatStyle.Unit}.
	 * Pairs of simple units can be concatenated with "-per-" to make a compound unit.
	 *
	 * @example `"byte"` (simple unit) or `"byte-per-second"` (compound unit).
	 */
	unit?: NumberFormatUnit;
	/**
	 * How to display the unit when using {@link NumberFormatStyle.Currency}.
	 */
	unitDisplay?: NumberFormatUnitDisplay;
	/**
	 * The number of displayed decimal digits.
	 * Default value is `undefined` (use the default of the {@link NumberFormatStyle}, decimal digits will be hidden for integer numbers).
	 * Must be between 0 and 15.
	 */
	precision?: number | NumberFormatRange;
	/**
	 * Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits.
	 * Default is `false` (the decimal symbol needs to be inserted manually).
	 */
	autoDecimalDigits?: boolean;
	/**
	 * Whether the minus symbol is automatically inserted or prevented to be inputted depending on the configured `valueRange`.
	 * Default is `true`.
	 */
	autoSign?: boolean;
	/**
	 * The range of accepted values.
	 * Default is `undefined` (no value range).
	 * The validation is triggered on blur and automatically sets the respective threshold if out of range.
	 */
	valueRange?: NumberFormatRange;
	/**
	 * Whether to use grouping separators such as thousands/lakh/crore separators.
	 * Default is `true`.
	 */
	useGrouping?: boolean;
}

export const DECIMAL_SEPARATORS = [',', '.', '٫'];
export const INTEGER_PATTERN = '(0|[1-9]\\d*)';
