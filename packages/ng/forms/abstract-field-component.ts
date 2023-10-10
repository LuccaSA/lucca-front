import { booleanAttribute, Component, inject } from '@angular/core';
import { injectNgControl } from './inject-ng-control';
import { NG_VALIDATORS, RequiredValidator, Validators } from '@angular/forms';

@Component({
	template: '',
	standalone: true,
})
export class AbstractFieldComponent {
	protected ngControl = injectNgControl();

	#ngModelRequiredValidator: RequiredValidator | null | undefined = inject(NG_VALIDATORS, { optional: true })?.find((v): v is RequiredValidator => v instanceof RequiredValidator);

	get required(): boolean {
		return this.ngControl.control.hasValidator(Validators.required) || booleanAttribute(this.#ngModelRequiredValidator.required);
	}
}
