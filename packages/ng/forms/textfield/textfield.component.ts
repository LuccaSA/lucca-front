import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';

@Component({
	selector: 'lu-textfield',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, FormsModule],
	templateUrl: './textfield.component.html',
	styleUrls: ['./textfield.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextfieldComponent),
			multi: true,
		},
	],
})
export class TextfieldComponent implements ControlValueAccessor {
	/**
	 * TODO connect with formControl includes Validators.required
	 * prob with formControl Invalid too
	 *
	 * inject formControl (ngControl?)
	 *
	 * Use current formControl instead of creating a new one with ngModel
	 *
	 * https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
	 */

	@Input({ required: true })
	label: string;

	@Input()
	placeholder: string;

	@Input({ transform: booleanAttribute })
	hiddenLabel = false;

	@Input()
	type: 'text' | 'email' | 'password' = 'text';

	@Input()
	inlineMessage: string;

	@Input()
	size: FormFieldSize = 'M';

	@Input({ transform: booleanAttribute })
	required = false;

	// TODO handle disabled, form or input?

	#onChange: (value: string) => void;

	#onTouched: () => void;

	value: string;

	registerOnChange(fn: (value: string) => void): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.#onTouched = fn;
	}

	writeValue(value: string): void {
		this.value = value;
	}

	onValueChange(value: string): void {
		if (this.#onChange) {
			this.#onChange(value);
		}
	}

	onTouched(): void {
		if (this.#onTouched) {
			this.#onTouched();
		}
	}
}
