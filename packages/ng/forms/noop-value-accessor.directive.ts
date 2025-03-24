//Source: https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
	selector: '[luNoopValueAccessor]',
	standalone: true,
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
