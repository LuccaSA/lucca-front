// Based on Intl number input
// (more info: https://dm4t2.github.io/)

import { NumberFormat } from './number-format';
import { removeLeadingZeros } from './number-format.utils';

abstract class AbstractNumberMask {
	protected numberFormat: NumberFormat;

	constructor(numberFormat: NumberFormat) {
		this.numberFormat = numberFormat;
	}
}

export interface NumberMask {
	conformToMask(str: string, previousConformedValue: string): string | { fractionDigits: string; numberValue: number };
}

export class DefaultNumberMask extends AbstractNumberMask implements NumberMask {
	conformToMask(str: string, previousConformedValue = ''): string | { fractionDigits: string; numberValue: number } {
		const negative = this.numberFormat.isNegative(str);
		const checkIncompleteValue = (str: string) => {
			if (str === '' && negative && previousConformedValue !== this.numberFormat.negativePrefix) {
				return '';
			} else if (this.numberFormat.maximumFractionDigits > 0) {
				if (this.numberFormat.isFractionIncomplete(str)) {
					return str;
				} else if (str.startsWith(this.numberFormat.decimalSymbol)) {
					return this.numberFormat.toFraction(str);
				}
			}
			return null;
		};

		let value = str;
		value = this.numberFormat.stripPrefixOrSuffix(value);
		value = this.numberFormat.stripMinusSymbol(value);

		const incompleteValue = checkIncompleteValue(value);
		if (incompleteValue != null) {
			return this.numberFormat.insertPrefixOrSuffix(incompleteValue, negative);
		}

		const [integer, ...fraction] = value.split(this.numberFormat.decimalSymbol);
		const integerDigits = removeLeadingZeros(this.numberFormat.onlyDigits(integer));
		const fractionDigits = this.numberFormat.onlyDigits(fraction.join('')).slice(0, this.numberFormat.maximumFractionDigits);
		const invalidFraction = fraction.length > 0 && fractionDigits.length === 0;
		const invalidNegativeValue = integerDigits === '' && negative && (previousConformedValue === str.slice(0, -1) || previousConformedValue !== this.numberFormat.negativePrefix);

		if (invalidFraction || invalidNegativeValue) {
			return previousConformedValue;
		} else if (integerDigits.match(/\d+/)) {
			return {
				numberValue: Number(`${negative ? '-' : ''}${integerDigits}.${fractionDigits}`),
				fractionDigits,
			};
		} else {
			return '';
		}
	}
}

export class AutoDecimalDigitsNumberMask extends AbstractNumberMask implements NumberMask {
	conformToMask(str: string, previousConformedValue = ''): string | { fractionDigits: string; numberValue: number } {
		if (
			str === '' ||
			(this.numberFormat.parse(previousConformedValue) === 0 && this.numberFormat.stripPrefixOrSuffix(previousConformedValue).slice(0, -1) === this.numberFormat.stripPrefixOrSuffix(str))
		) {
			return '';
		}
		const negative = this.numberFormat.isNegative(str);
		const numberValue =
			this.numberFormat.stripMinusSymbol(str) === ''
				? -0
				: Number(`${negative ? '-' : ''}${removeLeadingZeros(this.numberFormat.onlyDigits(str))}`) / Math.pow(10, this.numberFormat.maximumFractionDigits);
		return {
			numberValue,
			fractionDigits: numberValue.toFixed(this.numberFormat.maximumFractionDigits).slice(-this.numberFormat.maximumFractionDigits),
		};
	}
}
