import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FORM_FIELD_INSTANCE } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { InputDirective } from '@lucca-front/ng/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RADIO_GROUP_INSTANCE } from './radio-group-token';

@Component({
	selector: 'lu-radio-group-input',
	standalone: true,
	imports: [InputDirective, ReactiveFormsModule],
	hostDirectives: [NoopValueAccessorDirective],
	template: '<ng-content></ng-content>',
	styleUrl: './radio-group-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: RADIO_GROUP_INSTANCE,
			useExisting: forwardRef(() => RadioGroupInputComponent),
		},
	],
})
export class RadioGroupInputComponent {
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	ngControl = injectNgControl();

	@Input()
	size: 'S' | 'M';

	constructor() {
		if (this.formField) {
			this.formField.layout = 'fieldset';
		}
	}
}
