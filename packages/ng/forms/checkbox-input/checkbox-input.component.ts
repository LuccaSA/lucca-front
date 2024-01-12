import { Component, inject } from '@angular/core';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { injectNgControl } from '../inject-ng-control';

@Component({
	selector: 'lu-checkbox-input',
	standalone: true,
	imports: [ReactiveFormsModule, InputDirective],
	hostDirectives: [NoopValueAccessorDirective],
	templateUrl: './checkbox-input.component.html',
	host: {
		class: 'checkboxField',
	},
})
export class CheckboxInputComponent {
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	ngControl = injectNgControl();

	constructor() {
		if (this.formField) {
			this.formField.layout = 'checkable';
		}
	}
}
