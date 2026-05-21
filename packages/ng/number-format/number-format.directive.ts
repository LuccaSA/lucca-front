// Based on Intl number input
// (more info: https://dm4t2.github.io/)

import { computed, Directive, ElementRef, inject, input, model, Renderer2, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { NumberFormat } from './number-format';
import { NumberFormatOptions } from './number-format.models';
//		'
@Directive({
	selector: 'input[luNumberFormatInput]',
	host: {
		'(focus)': 'focus()',
		'(blur)': 'lostFocus()',
		'(input)': 'input()',
	},
})
export class NumberFormatDirective implements FormValueControl<number | null> {
	readonly #inputElement = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>).nativeElement;
	readonly #renderer = inject(Renderer2);

	readonly value = model(null);
	readonly touched = model<boolean>(false);
	readonly #isFocused = signal<boolean>(false);

	readonly formatOptions = input.required<NumberFormatOptions>();
	readonly #numberFormat = computed(() => new NumberFormat(this.formatOptions()));

	setDisabledState(isDisabled: boolean): void {
		this.#renderer.setProperty(this.#inputElement, 'disabled', isDisabled);
	}

	focus(): void {
		this.#isFocused.set(true);
		this.#inputElement.value = this.#numberFormat().getFocusFormat(this.value());
	}

	lostFocus(): void {
		this.#isFocused.set(false);
		this.#inputElement.value = this.#numberFormat().getBlurFormat(this.value());
		this.touched.set(true);
	}

	input(): void {
		const parsedInput = this.#numberFormat().parse(this.#inputElement.value);

		this.#inputElement.value = parsedInput.cleanInput;

		this.value.set(parsedInput.value);
	}
}
