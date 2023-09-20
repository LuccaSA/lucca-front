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
	@Input({ required: true })
	label: string;

	@Input()
	placeholder: string;

	@Input({ transform: booleanAttribute })
	hiddenLabel = false;

	@Input()
	type: 'text' | 'email' | 'number' | 'password' = 'text';

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
