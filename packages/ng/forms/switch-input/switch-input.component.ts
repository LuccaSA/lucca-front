import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { injectNgControl } from '../inject-ng-control';

@Component({
	selector: 'lu-switch-input',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, InputDirective],
	templateUrl: './switch-input.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'switchField',
	},
})
export class SwitchInputComponent {
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	ngControl = injectNgControl();

	constructor() {
		if (this.formField) {
			this.formField.layout = 'checkable';
		}
	}
}
