import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, model, output, ViewEncapsulation } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { getIntl } from '@lucca-front/ng/core';
import { CHECKBOX_INPUT_TRANSLATIONS } from '../checkbox-input/checkbox-input.translate';

@Component({
	selector: 'lu-switch-input',
	imports: [InputDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './switch-input.component.html',
	styleUrl: './switch-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'switchField',
	},
})
export class SwitchInputComponent implements FormCheckboxControl {
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	readonly checked = model(false);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	intl = getIntl(CHECKBOX_INPUT_TRANSLATIONS);

	constructor() {
		if (this.formField) {
			this.formField.layout.set('checkable');
		}
	}
}
