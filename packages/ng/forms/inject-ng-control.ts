//Source: https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55
// Heavily modified to handle ngModel properly
import { DestroyRef, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { distinctUntilChanged, map } from 'rxjs';

/**
 * @deprecated Form bricks now implement the signal forms `FormValueControl` / `FormCheckboxControl`
 * contract; use `[formField]` (signal forms) or the component's `value` / `checked` model instead
 * of `formControl` / `ngModel`. Will be removed in a future major version.
 */
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

	const field = inject(FormField, { optional: true });
	if (field) {
		return generateMirrorControl(ngControl, field);
	}

	throw new Error(`NgControl is not an instance of InteropNgControl, FormControlDirective, FormControlName or NgModel`);
}

type LFCompatControl = {
	// eslint-disable-next-line
	control: FormControl<any>;
	markAsTouched: () => void;
	registerOnChange: () => void;
	registerOnDisabledChange: () => void;
	_unregisterOnChange: () => void;
	_unregisterOnDisabledChange: () => void;
	_registerOnCollectionChange: () => void;
	_unregisterOnCollectionChange: () => void;
} & NgControl;

/**
 * Ensure that all needed method are present.
 *
 * @experimental
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateMirrorControl(_ngControl: NgControl, field: FormField<unknown>): NgControl & { control: FormControl<any> } {
	const control = new FormControl();
	const ngControl = _ngControl as unknown as LFCompatControl;

	ngControl.control = control;

	// Value | Field -> Control
	effect(() => control.setValue(field.state().value(), { emitEvent: false }));

	// Value | Control -> Field
	control.valueChanges.pipe(takeUntilDestroyed()).subscribe((v) => field.state().value.set(v));

	// Touched | Control -> Field
	control.statusChanges
		.pipe(
			map(() => control.touched),
			distinctUntilChanged(),
			takeUntilDestroyed(),
		)
		.subscribe((touched) => touched && field.state().markAsTouched());

	// Touched | Field -> Control
	effect(() => (field.state().touched() ? control.markAsTouched() : control.markAsUntouched()));

	// Dirty | Field -> Control
	effect(() => (field.state().dirty() ? control.markAllAsDirty() : control.markAsPristine()));

	// Disabled | Field -> Control
	effect(() => (field.state().disabled() ? control.disable() : control.enable()));

	// Error | Field -> Control
	effect(() => control.setErrors(field.state().errors()));

	ngControl.registerOnChange ??= () => {};
	ngControl.markAsTouched ??= () => {};
	ngControl.registerOnDisabledChange ??= () => {};
	ngControl._unregisterOnChange ??= () => {};
	ngControl._unregisterOnDisabledChange ??= () => {};
	ngControl._registerOnCollectionChange ??= () => {};
	ngControl._unregisterOnCollectionChange ??= () => {};

	// eslint-disable-next-line
	return ngControl as NgControl & { control: FormControl<any> };
}
