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

export interface NumberFormatOptions {
	locale: string;
	style: NumberFormatStyle;
	currency?: string | undefined;
	currencyDisplay?: NumberFormatCurrencyDisplay | undefined;
	unit?: NumberFormatUnit | undefined;
	unitDisplay?: NumberFormatUnitDisplay | undefined;
	useGrouping?: boolean | undefined;
	minimumIntegerDigits?: number | undefined;
	minimumFractionDigits?: number | undefined;
	maximumFractionDigits?: number | undefined;
	minimumSignificantDigits?: number | undefined;
	maximumSignificantDigits?: number | undefined;
}
