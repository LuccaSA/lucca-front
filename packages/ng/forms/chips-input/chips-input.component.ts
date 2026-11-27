import { ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, inject, input, LOCALE_ID, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChipComponent } from '@lucca-front/ng/chip';
import { ClearComponent } from '@lucca-front/ng/clear';
import { intlInputOptions, luBooleanAttribute } from '@lucca-front/ng/core';
import { InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { LU_TEXTFIELD_TRANSLATIONS } from '../text-input/text-input.translate';

/**
 * Keys validating the text typed in the field into a new chip.
 */
const VALIDATION_KEYS = ['Enter', 'Tab', ','];

/**
 * Separator splitting a pasted text into several chips.
 */
const SEPARATOR = ',';

@Component({
	selector: 'lu-chips-input',
	imports: [ChipComponent, ClearComponent, InputDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './chips-input.component.html',
	styleUrl: './chips-input.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ChipsInputComponent),
			multi: true,
		},
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsInputComponent implements ControlValueAccessor {
	readonly intl = input(...intlInputOptions(LU_TEXTFIELD_TRANSLATIONS));

	readonly inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

	/**
	 * Placeholder of the text input, displayed while nothing is typed
	 */
	readonly placeholder = input<string>('');

	/**
	 * Displays a button removing every removable chip at once
	 */
	readonly hasClearer = input(false, { transform: luBooleanAttribute });

	/**
	 * Values displayed as chips that cannot be removed, for data filled automatically from a setting.
	 * They must be part of the control value to be displayed.
	 */
	readonly unkillableValues = input<readonly string[]>([]);

	/**
	 * Tells whether a value has the expected format (an email address, for example).
	 * A value it rejects is still added, as a chip in error state: it is up to the form to ignore or reject it on submit.
	 */
	readonly chipValidator = input<((value: string) => boolean) | null>(null);

	protected readonly values = signal<readonly string[]>([]);

	protected readonly text = signal('');

	// Suffixed with Internal to avoid conflict with NgModel's disabled attribute
	protected readonly disabledInternal = signal(false);

	/**
	 * Index of the chip selected by a first Backspace in the empty field, removed by the next one
	 */
	protected readonly selectedIndex = signal<number | null>(null);

	protected readonly chips = computed(() => {
		const unkillableValues = this.unkillableValues();
		const chipValidator = this.chipValidator();
		return this.values().map((value) => ({
			value,
			unkillable: unkillableValues.includes(value),
			invalid: chipValidator ? !chipValidator(value) : false,
		}));
	});

	protected readonly hasRemovableChips = computed(() => this.chips().some((chip) => !chip.unkillable));

	readonly #listFormat = new Intl.ListFormat(inject(LOCALE_ID));

	/**
	 * Values displayed in presentation mode, as a list formatted for the current locale
	 */
	protected readonly formattedValues = computed(() => this.#listFormat.format(this.values()));

	#onChange: (value: string[]) => void = () => {};

	#onTouched: () => void = () => {};

	writeValue(value: readonly string[] | null | undefined): void {
		this.values.set(value ?? []);
		this.selectedIndex.set(null);
	}

	registerOnChange(fn: (value: string[]) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabledInternal.set(isDisabled);
	}

	focusInput(): void {
		this.inputElementRef().nativeElement.focus();
	}

	protected onKeydown(event: KeyboardEvent): void {
		const text = this.text();

		if (VALIDATION_KEYS.includes(event.key) && !event.shiftKey && !event.isComposing) {
			// Without text, Enter submits the form and Tab moves the focus, as in any field
			if (text.trim() || event.key === SEPARATOR) {
				event.preventDefault();
				this.#addValues([text]);
				this.#setText('');
			}
			return;
		}

		if (event.key === 'Backspace' && text === '') {
			this.#handleBackspace();
			return;
		}

		this.selectedIndex.set(null);
	}

	protected onInput(event: Event): void {
		const text = (event.target as HTMLInputElement).value;
		if (text.includes(SEPARATOR)) {
			// A pasted list is split into chips, the text after the last separator is kept in the field
			const parts = text.split(SEPARATOR);
			const rest = parts.pop() ?? '';
			this.#addValues(parts);
			this.#setText(rest);
			return;
		}
		this.text.set(text);
	}

	protected onBlur(): void {
		this.selectedIndex.set(null);
		this.#onTouched();
	}

	protected removeAt(index: number): void {
		const chip = this.chips()[index];
		if (!chip || chip.unkillable || this.disabledInternal()) {
			return;
		}
		this.selectedIndex.set(null);
		this.#updateValues(this.values().filter((_, i) => i !== index));
		this.focusInput();
	}

	protected clearValues(): void {
		this.selectedIndex.set(null);
		this.#updateValues(this.values().filter((value) => this.unkillableValues().includes(value)));
		this.focusInput();
	}

	#handleBackspace(): void {
		const selectedIndex = this.selectedIndex();
		if (selectedIndex !== null) {
			this.removeAt(selectedIndex);
			return;
		}
		const chips = this.chips();
		for (let index = chips.length - 1; index >= 0; index--) {
			if (!chips[index].unkillable) {
				this.selectedIndex.set(index);
				return;
			}
		}
	}

	#addValues(texts: string[]): void {
		const values = [...this.values()];
		texts
			.map((text) => text.trim())
			.filter((value) => value !== '')
			.forEach((value) => {
				if (!values.includes(value)) {
					values.push(value);
				}
			});
		if (values.length !== this.values().length) {
			this.#updateValues(values);
		}
	}

	#updateValues(values: string[]): void {
		this.values.set(values);
		this.#onChange(values);
	}

	#setText(text: string): void {
		this.text.set(text);
		this.inputElementRef().nativeElement.value = text;
	}
}
