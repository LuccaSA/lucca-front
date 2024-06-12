// Based on Intl number input
// (more info: https://dm4t2.github.io/)

import { computed, Directive, ElementRef, forwardRef, HostListener, inject, input, Renderer2, signal } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumberFormat } from './number-format';
import { NumberFormatOptions } from './number-format.models';

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
export class NumberFormatDirective implements ControlValueAccessor {
	readonly #inputElement = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>).nativeElement;
	readonly #renderer = inject(Renderer2);

	#numberValue = signal<number | null>(null);
	#isFocused = signal<boolean>(false);

	min = input<number | undefined>(undefined);
	max = input<number | undefined>(undefined);
	formatOptions = input.required<NumberFormatOptions>();
	#numberFormat = computed(() => {
		return new NumberFormat(this.formatOptions());
	});

	onChange: (_value: number | undefined | null) => void = () => {};

	onTouched: () => void = (): void => {};

	writeValue(value: number): void {
		value = this.#applyRange(value);
		this.#numberValue.set(value);
		this.#inputElement.value = this.#isFocused() ? this.#numberFormat().getFocusFormat(value) : this.#numberFormat().getBlurFormat(value);
	}

	#applyRange(value: number | null): number | null {
		if (value === null) {
			return null;
		}
		if (this.min() !== undefined) {
			value = Math.max(this.min(), value);
		}
		if (this.max() !== undefined) {
			value = Math.min(this.max(), value);
		}
		return value;
	}

	registerOnChange(fn: (_value: number | undefined | null) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.#renderer.setProperty(this.#inputElement, 'disabled', isDisabled);
	}
	@HostListener('focus') focus(): void {
		this.#isFocused.set(true);
		this.#inputElement.value = this.#getReformattedInput(this.#inputElement.value, this.#numberValue());
	}

	@HostListener('blur') lostFocus(): void {
		this.#isFocused.set(false);
		this.#inputElement.value = this.#numberFormat().getBlurFormat(this.#numberValue());
		this.onTouched();
	}

	@HostListener('input') input(): void {
		const currentInputValue = this.#inputElement.value;

		let numberValue = this.#numberFormat().parse(currentInputValue);
		numberValue = this.#applyRange(numberValue);

		const formattedValue = this.#getReformattedInput(currentInputValue, numberValue);

		// format can have an effect on value (ie: fraction min/max)
		numberValue = this.#numberFormat().parse(formattedValue);

		this.#numberValue.set(numberValue);
		this.#inputElement.value = formattedValue;

		this.onChange?.(numberValue);
	}

	#getReformattedInput(inputValue: string, value: number | null): string {
		let formattedValue = this.#numberFormat().getFocusFormat(value);

		// Check if min allows negative values
		if (this.min() === undefined || this.min() < 0) {
			// Preserve minus sign even if no digits provided after it
			if (formattedValue === '' && inputValue === '-') {
				formattedValue = '-';
			}
		}

		// Check if max forces negative values
		if (this.max() !== undefined && this.max() <= 0 && formattedValue === '') {
			formattedValue = '-';
		}

		// Preserve decimal delimiter even if no digits provided after it
		if (this.#numberFormat().hasDecimalAtEnd(inputValue) && this.#numberFormat().countDecimalOccurences(formattedValue) === 0) {
			formattedValue += '.';
		}

		return formattedValue;
	}
}
