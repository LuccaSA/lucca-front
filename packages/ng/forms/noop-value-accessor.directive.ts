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
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	writeValue(_obj: unknown): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	registerOnChange(_fn: unknown): void {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	registerOnTouched(_fn: unknown): void {}
}
