import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FORM_FIELD_INSTANCE, FormFieldComponent, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { getIntl } from '@lucca-front/ng/core';
import { CHECKBOX_INPUT_TRANSLATIONS } from '../checkbox-input/checkbox-input.translate';

@Component({
	selector: 'lu-switch-input',
	imports: [ReactiveFormsModule, InputDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './switch-input.component.html',
	styleUrl: './switch-input.component.scss',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'switchField',
	},
})
export class SwitchInputComponent {
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	ngControl = injectNgControl();

	intl = getIntl(CHECKBOX_INPUT_TRANSLATIONS);

	constructor() {
		if (this.formField) {
			this.formField.layout.set('checkable');
		}
	}
}
