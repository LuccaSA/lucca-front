//Source: https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
import { Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @deprecated Form bricks now implement the signal forms `FormValueControl` / `FormCheckboxControl`
 * contract; use `[formField]` (signal forms) or the component's `value` / `checked` model instead
 * of `formControl` / `ngModel`. Will be removed in a future major version.
 */
@Directive({
	selector: '[luNoopValueAccessor]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: NoopValueAccessorDirective,
		},
	],
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
	writeValue(): void {}

	registerOnChange(): void {}

	registerOnTouched(): void {}
}
