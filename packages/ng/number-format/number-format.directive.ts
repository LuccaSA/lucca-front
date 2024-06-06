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
		if (!this.inputElement.readOnly) {
			const isInputEmpty = !this.inputElement.value || this.inputElement.value.trim().length === 0;
			const isInputMinusSign = this.inputElement.value === '-';
			if (isInputEmpty) {
				this.value = undefined;
			} else if (isInputMinusSign) {
				// wait for more
				return;
			} else {
				const parsedValue = this.#cleanParse(this.inputElement.value);
				if (!isNaN(parsedValue)) {
					this.value = parsedValue;
				}
			}
			let selectionStart = this.inputElement.selectionStart;
			const formattedValue = this.#formatValue(this.value);
			// If formatted value is different from input
			// selectionStart should be changed
			if (this.inputElement.value.slice(0, selectionStart).localeCompare(formattedValue.slice(0, selectionStart))) {
				if (this.inputElement.value.length < formattedValue.length) {
					selectionStart++;
				}
				if (this.inputElement.value.length > formattedValue.length) {
					selectionStart--;
				}
			}
			this.inputElement.value = this.#formatValue(this.value);
			this.inputElement.selectionStart = selectionStart;
			this.inputElement.selectionEnd = selectionStart;
			this.onChange(isNaN(this.value) ? null : this.value);
		}
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
