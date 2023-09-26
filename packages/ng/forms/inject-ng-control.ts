//Source: https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
// Heavily modified to handle ngModel properly
import { FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function injectNgControl() {
	const ngControl = inject(NgControl, { self: true, optional: true });

	if (!ngControl) {
		throw new Error('NgControl not found');
	}

	if (ngControl instanceof NgModel) {
		const destroyRef = inject(DestroyRef);
		ngControl.control.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe((value) => {
			if (ngControl.model !== value || ngControl.viewModel !== value) {
				ngControl.viewToModelUpdate(value);
			}
		});
		return ngControl;
	}

	if (ngControl instanceof FormControlDirective || ngControl instanceof FormControlName) {
		return ngControl;
	}

	throw new Error(`NgControl is not an instance of FormControlDirective, FormControlName or NgModel`);
}
