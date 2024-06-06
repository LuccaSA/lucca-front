import { Directive, ElementRef, forwardRef, HostListener, inject, Input, LOCALE_ID, OnChanges, Optional, Renderer2 } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { createParseNumberLookuptable, formatNumber, parseNumber } from './number-format.models';

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
	#el = inject<ElementRef<HTMLInputElement>>(ElementRef<HTMLInputElement>);
	#renderer = inject(Renderer2);
	#localeId = inject(LOCALE_ID);
	#parseLookupTable = createParseNumberLookuptable(this.#localeId);

	value?: number | null;
	inputElement: HTMLInputElement = this.#el.nativeElement;

	@Input() fractionDigits = 2;
	@Optional() @Input() set _value(value: number) {
		if (value !== null) {
			this.value = value;
		}
	}

	onChange: (_value: number | undefined | null) => void = () => {};
	onTouched: () => void = (): void => {};

	ngOnChanges(): void {
		if (this.inputElement !== document.activeElement) {
			this.inputElement.value = this.#formatValue(this.value);
		}
	}

	@HostListener('focus') focus(): void {
		if (!this.inputElement.readOnly) {
			this.inputElement.value = this.#formatValue(this.value);
		}
	}

	@HostListener('blur') lostFocus(): void {
		if (!this.inputElement.readOnly) {
			this.inputElement.value = this.#formatValue(this.value);
			this.onTouched();
		}
	}

	@HostListener('input') input(): void {
		if (this.inputElement.readOnly) {
			return;
		}
		const inputValue = this.inputElement.value;

		// Wait for others characters before parsing/formatting
		if (inputValue === '-') {
			return;
		}

		// Nil or empty input should be treated as null value
		if (inputValue == null || inputValue === '') {
			this.value = null;
		} else {
			const parsedValue = this.#cleanParse(inputValue);
			// Update value only if parsed input is a number
			if (!isNaN(parsedValue)) {
				this.value = parsedValue;
				this.onChange(this.value);
			}
		}
		this.#updateInputValue();
	}

	#updateInputValue(): void {
		const inputValue = this.inputElement.value;
		let selectionStart = this.inputElement.selectionStart;
		const formattedValue = this.#formatValue(this.value);

		// Check if caret position evolve with formatting
		const caretPositionChanged = !!inputValue.slice(0, selectionStart).localeCompare(formattedValue.slice(0, selectionStart));
		if (caretPositionChanged) {
			// A character has been inserted before caret position (ie: ',' separator)
			if (inputValue.length < formattedValue.length) {
				selectionStart++;
			}
			// A character has been removed before caret position (ie: ',' separator)
			if (inputValue.length > formattedValue.length) {
				selectionStart--;
			}
		}
		this.inputElement.value = this.#formatValue(this.value);
		this.inputElement.selectionStart = selectionStart;
		this.inputElement.selectionEnd = selectionStart;
	}

	writeValue(value: number): void {
		this.value = value;
		if (this.inputElement !== document.activeElement) {
			this.inputElement.value = this.#formatValue(this.value);
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

	#cleanParse(value: string): number {
		return this.#parse(this.#formatValue(this.#parse(value)));
	}

	#formatValue(value: number | undefined | null): string {
		return formatNumber(value, this.#localeId, { style: 'decimal', minimumIntegerDigits: 1, minimumFractionDigits: this.fractionDigits, maximumFractionDigits: this.fractionDigits });
	}

	#parse(value: string): number {
		return parseNumber(value, { table: this.#parseLookupTable });
	}
}
