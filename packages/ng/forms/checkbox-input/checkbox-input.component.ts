import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

@Component({
	selector: 'lu-checkbox-input',
	standalone: true,
	imports: [ReactiveFormsModule, InputDirective],
	hostDirectives: [NoopValueAccessorDirective],
	templateUrl: './checkbox-input.component.html',
	styleUrls: ['./checkbox-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
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
