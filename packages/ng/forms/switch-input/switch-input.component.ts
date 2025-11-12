import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

@Component({
	selector: 'lu-switch-input',
	imports: [ReactiveFormsModule, InputDirective],
	templateUrl: './switch-input.component.html',
	styleUrl: './switch-input.component.scss',
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
			this.formField.layout.set('checkable');
		}
	}
}
