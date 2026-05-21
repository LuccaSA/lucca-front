import { ChangeDetectionStrategy, Component, forwardRef, inject, signal, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { CHECKBOX_INPUT_TRANSLATIONS } from '../checkbox-input/checkbox-input.translate';

@Component({
	selector: 'lu-switch-input',
	imports: [InputDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './switch-input.component.html',
	styleUrl: './switch-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchInputComponent),
			multi: true,
		},
	],
	host: {
		class: 'switchField',
	},
})
export class SwitchInputComponent implements ControlValueAccessor {
	readonly formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	readonly intl = getIntl(CHECKBOX_INPUT_TRANSLATIONS);

	readonly checked = signal(false);
	readonly disabled = signal(false);

	#onChange?: (value: boolean) => void;
	#onTouched?: () => void;

	constructor() {
		if (this.formField) {
			this.formField.layout.set('checkable');
		}
	}

	writeValue(value: boolean): void {
		this.checked.set(value);
	}

	registerOnChange(fn: (value: boolean) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled.set(isDisabled);
	}

	toggle(): void {
		this.checked.update((value) => !value);
		this.#onChange?.(this.checked());
		this.#onTouched?.();
	}
}
