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

	formatOptions = input.required<NumberFormatOptions>();
	#numberFormat = computed(() => {
		return new NumberFormat(this.formatOptions());
	});

	// suffixChanged = output<string | null>();
	// prefixChanged = output<string | null>();
	// formattedValueChanged = output<string | null>();
	//
	// constructor() {
	// 	effect(() => {
	// 		this.suffixChanged.emit(this.#numberFormat().getSuffix(this.#numberValue()));
	// 		this.prefixChanged.emit(this.#numberFormat().getPrefix(this.#numberValue()));
	// 		this.formattedValueChanged.emit(this.#numberFormat().format(this.#numberValue()));
	// 	});
	// }

	onChange: (_value: number | undefined | null) => void = () => {};

	onTouched: () => void = (): void => {};

	writeValue(value: number): void {
		this.#numberValue.set(value);
		this.#inputElement.value = this.#isFocused() ? this.#numberFormat().getFocusFormat(value) : this.#numberFormat().getBlurFormat(value);
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
		this.#inputElement.value = this.#numberFormat().getFocusFormat(this.#numberValue());
	}

	@HostListener('blur') lostFocus(): void {
		this.#isFocused.set(false);
		this.#inputElement.value = this.#numberFormat().getBlurFormat(this.#numberValue());
		this.onTouched();
	}

	@HostListener('input') input(): void {
		const currentInputValue = this.#inputElement.value;

		let numberValue = this.#numberFormat().parse(currentInputValue);
		const formattedValue = this.#getReformattedInput(currentInputValue, numberValue);
		// format can have an effect on value (ie: fraction min/max)
		numberValue = this.#numberFormat().parse(formattedValue);

		this.#numberValue.set(numberValue);
		this.#inputElement.value = formattedValue;

		this.onChange?.(numberValue);
	}

	#getReformattedInput(inputValue: string, value: number | null): string {
		let formattedValue = this.#numberFormat().getFocusFormat(value);

		// Preserve minus sign even if no digits provided after it
		if (formattedValue === '' && inputValue === '-') {
			formattedValue = '-';
		}

		// Preserve decimal delimiter even if no digits provided after it
		if (this.#numberFormat().hasDecimalAtEnd(inputValue) && this.#numberFormat().countDecimalOccurences(formattedValue) === 0) {
			formattedValue += '.';
		}

		return formattedValue;
	}
}
