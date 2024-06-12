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

	#value = signal<number | undefined | null>(null);
	#valueAtFocus: number | undefined | null = null;
	#isFocused = signal<boolean>(false);

	formatOptions = input.required<NumberFormatOptions>();
	#numberFormat = computed(() => {
		return new NumberFormat(this.formatOptions());
	});

	onChange: (_value: number | undefined | null) => void = () => {};

	onTouched: () => void = (): void => {};

	writeValue(value: number | undefined | null): void {
		value = this.#numberFormat().applyRange(value);
		this.#value.set(value);
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
		this.#valueAtFocus = this.#value();
		this.#isFocused.set(true);
		this.#inputElement.value = this.#numberFormat().getFocusFormat(this.#value());
	}

	@HostListener('blur') lostFocus(): void {
		this.#isFocused.set(false);
		this.#inputElement.value = this.#numberFormat().getBlurFormat(this.#value());
		if (this.#valueAtFocus !== this.#value()) {
			this.onTouched();
		}
	}

	@HostListener('input') input(): void {
		const parsedInput = this.#numberFormat().parse(this.#inputElement.value);

		this.#inputElement.value = parsedInput.cleanInput;

		this.#value.set(parsedInput.value);

		this.onChange?.(parsedInput.value);
	}
}
