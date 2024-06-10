// Based on Intl number input
// (more info: https://dm4t2.github.io/)

import { Directive, ElementRef, forwardRef, HostListener, inject, Input, OnChanges, Renderer2 } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DECIMAL_SEPARATORS, NumberFormatConfig } from './number-format.models';
import { NumberMask } from './number-mask';
import { NumberFormat } from './number-format';
import { countOccurrences } from './number-format.utils';

@Directive({
	selector: 'input[luNumberFormatInput]',
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFormatDirective),
			multi: true,
		},
	],
})
export class NumberFormatDirective implements ControlValueAccessor, OnChanges {
	readonly inputElement = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>).nativeElement;
	readonly #renderer = inject(Renderer2);

	#numberValue!: number | null;
	#numberValueOnFocus!: number | null;
	#numberFormat!: NumberFormat;
	#decimalSymbolInsertedAt?: number;
	#numberMask!: NumberMask;
	#formattedValue!: string;
	#isFocused!: boolean;
	#minValue!: number;
	#maxValue!: number;

	@Input({ required: true }) formatConfig: NumberFormatConfig;

	constructor() {
		this.#init(this.formatConfig);
		this.inputElement.value = this.#numberFormat.format(this.#numberValue);
	}

	onChange: (_value: number | undefined | null) => void = () => {};

	onTouched: () => void = (): void => {};

	ngOnChanges(): void {
		this.#init(this.formatConfig);
	}

	#init(options: NumberFormatConfig) {
		this.formatConfig = {
			autoSign: true,
			...options,
		};
		this.#numberFormat = new NumberFormat(this.formatConfig);
		this.#numberMask = new NumberMask(this.#numberFormat);
		this.#minValue = this.#getMinValue();
		this.#maxValue = this.#getMaxValue();
	}

	#getMinValue(): number {
		let min = this.#toFloat(-Number.MAX_SAFE_INTEGER);
		if (this.formatConfig.valueRange?.min !== undefined) {
			min = Math.max(this.formatConfig.valueRange?.min, this.#toFloat(-Number.MAX_SAFE_INTEGER));
		}
		if (!this.formatConfig.autoSign && min < 0) {
			min = 0;
		}
		return min;
	}

	#getMaxValue(): number {
		let max = this.#toFloat(Number.MAX_SAFE_INTEGER);
		if (this.formatConfig.valueRange?.max !== undefined) {
			max = Math.min(this.formatConfig.valueRange?.max, this.#toFloat(Number.MAX_SAFE_INTEGER));
		}
		if (!this.formatConfig.autoSign && max < 0) {
			max = this.#toFloat(Number.MAX_SAFE_INTEGER);
		}
		return max;
	}

	#toFloat(value: number): number {
		return value / 10 ** this.#numberFormat.maximumFractionDigits;
	}

	#toInteger(value: number) {
		return Number(value.toFixed(this.#numberFormat.maximumFractionDigits).split('.').join(''));
	}

	#validateValueRange(value: number): number {
		return Math.min(Math.max(value, this.#minValue), this.#maxValue);
	}

	#applyFixedFractionFormat(value: number | null, forcedChange = false) {
		if (value != null) {
			value = this.#validateValueRange(value);
			if (this.formatConfig.style === 'percent') {
				value *= 100;
			}
		}
		this.#format(this.#numberFormat.format(value));
		if (value !== this.#numberValue || forcedChange) {
			this.onChange?.(this.#numberValue);
		}
	}

	#setCaretPosition(start: number, end = start) {
		this.inputElement.setSelectionRange(start, end);
	}

	#format(value: string | null, hideNegligibleDecimalDigits = false) {
		if (value != null) {
			if (this.#decimalSymbolInsertedAt !== undefined) {
				value = this.#numberFormat.normalizeDecimalSeparator(value, this.#decimalSymbolInsertedAt);
				this.#decimalSymbolInsertedAt = undefined;
			}
			const conformedValue = this.#numberMask.conformToMask(value, this.#formattedValue);
			let formattedValue: string;
			if (typeof conformedValue === 'object') {
				const { numberValue, fractionDigits } = conformedValue;
				let { maximumFractionDigits, minimumFractionDigits } = this.#numberFormat;
				if (this.#isFocused) {
					minimumFractionDigits = hideNegligibleDecimalDigits ? fractionDigits.replace(/0+$/, '').length : Math.min(maximumFractionDigits, fractionDigits.length);
				} else if (Number.isInteger(numberValue) && (this.formatConfig.precision === undefined || minimumFractionDigits === 0)) {
					minimumFractionDigits = maximumFractionDigits = 0;
				}
				formattedValue =
					this.#toInteger(Math.abs(numberValue)) > Number.MAX_SAFE_INTEGER
						? this.#formattedValue
						: this.#numberFormat.format(numberValue, {
								useGrouping: this.formatConfig.useGrouping && !this.#isFocused,
								minimumFractionDigits,
								maximumFractionDigits,
							});
			} else {
				formattedValue = conformedValue;
			}
			if (this.formatConfig.autoSign) {
				if (this.#maxValue <= 0 && !this.#numberFormat.isNegative(formattedValue) && this.#numberFormat.parse(formattedValue) !== 0) {
					formattedValue = formattedValue.replace(this.#numberFormat.prefix, this.#numberFormat.negativePrefix);
				}
				if (this.#minValue >= 0) {
					formattedValue = formattedValue.replace(this.#numberFormat.negativePrefix, this.#numberFormat.prefix);
				}
			}
			if (this.#isFocused) {
				formattedValue = formattedValue
					.replace(this.#numberFormat.negativePrefix, this.#numberFormat.minusSymbol)
					.replace(this.#numberFormat.prefix, '')
					.replace(this.#numberFormat.suffix[1], '')
					.replace(this.#numberFormat.suffix[0], '');
			}

			this.inputElement.value = formattedValue;
			this.#numberValue = this.#numberFormat.parse(formattedValue);
		} else {
			this.inputElement.value = '';
			this.#numberValue = null;
		}
		this.#formattedValue = this.inputElement.value;
	}

	@HostListener('focus') focus(): void {
		this.#isFocused = true;
		this.#numberValueOnFocus = this.#numberValue;
		const { value, selectionStart, selectionEnd } = this.inputElement;
		this.#format(value);
		if (selectionStart != null && selectionEnd != null && Math.abs(selectionStart - selectionEnd) > 0) {
			this.#setCaretPosition(0, this.inputElement.value.length);
		} else if (selectionStart != null) {
			const getCaretPositionOnFocus = () => {
				const { prefix, groupingSymbol } = this.#numberFormat;
				let result = selectionStart - prefix.length;
				if (groupingSymbol !== undefined) {
					result -= countOccurrences(value.substring(0, selectionStart), groupingSymbol);
				}
				return result;
			};
			this.#setCaretPosition(getCaretPositionOnFocus());
		}
	}

	@HostListener('blur') lostFocus(): void {
		if (!this.inputElement.readOnly) {
			this.#isFocused = false;
			this.#applyFixedFractionFormat(this.#numberValue, this.#numberValueOnFocus !== this.#numberValue);
			this.onTouched();
		}
	}

	@HostListener('input', ['$event.target.value']) input(inputEvent: InputEvent): void {
		const { value, selectionStart } = this.inputElement;
		if (selectionStart && inputEvent.data && DECIMAL_SEPARATORS.includes(inputEvent.data)) {
			this.#decimalSymbolInsertedAt = selectionStart - 1;
		}
		this.#format(value);
		if (this.#isFocused && selectionStart != null) {
			const caretPositionAfterFormat = this.getCaretPositionAfterFormat(value, selectionStart);
			this.#setCaretPosition(caretPositionAfterFormat);
		}

		this.onChange?.(this.#numberValue);
	}

	getCaretPositionAfterFormat(value: string, selectionStart: number) {
		const { decimalSymbol, maximumFractionDigits, groupingSymbol } = this.#numberFormat;

		let caretPositionFromLeft = value.length - selectionStart;
		const newValueLength = this.#formattedValue.length;
		if (this.#formattedValue.substring(selectionStart, 1) === groupingSymbol && countOccurrences(this.#formattedValue, groupingSymbol) === countOccurrences(value, groupingSymbol) + 1) {
			return newValueLength - caretPositionFromLeft - 1;
		}

		if (newValueLength < caretPositionFromLeft) {
			return selectionStart;
		}

		if (decimalSymbol !== undefined && value.indexOf(decimalSymbol) !== -1) {
			const decimalSymbolPosition = value.indexOf(decimalSymbol) + 1;
			if (Math.abs(newValueLength - value.length) > 1 && selectionStart <= decimalSymbolPosition) {
				return this.#formattedValue.indexOf(decimalSymbol) + 1;
			} else {
				if (selectionStart > decimalSymbolPosition) {
					if (this.#numberFormat.onlyDigits(value.substring(decimalSymbolPosition)).length - 1 === maximumFractionDigits) {
						caretPositionFromLeft -= 1;
					}
				}
			}
		}
		return newValueLength - caretPositionFromLeft;
	}

	writeValue(value: number): void {
		this.#numberValue = value;
		if (this.inputElement !== document.activeElement) {
			this.#applyFixedFractionFormat(value);
		}
	}

	registerOnChange(fn: (_value: number | undefined | null) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.#renderer.setProperty(this.inputElement, 'disabled', isDisabled);
	}
}
