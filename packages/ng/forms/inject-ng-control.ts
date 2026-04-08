//Source: https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
// Heavily modified to handle ngModel properly
import { DestroyRef, inject, Injector, runInInjectionContext, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { compatForm } from '@angular/forms/signals/compat';

export function injectFormField<T>(): () => FieldTree<T> | FieldTree<FormControl<T>> {
	const field = inject<FormField<T>>(FormField, { optional: true });
	if (field) {
		return field.formField;
	}

	const ngControl = injectNgControl();
	const injector = inject(Injector);
	let form: FieldTree<FormControl<T>> | null;
	return () => {
		if (!form) {
			const wrapper = signal(ngControl.control as FormControl<T>);
			form = untracked(() => runInInjectionContext(injector, () => compatForm(wrapper)));
		}
		return form;
	};
}
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
