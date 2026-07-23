import { ChangeDetectionStrategy, Component, computed, ElementRef, Signal, signal, Type, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, validate } from '@angular/forms/signals';
import { injectNgControl } from './inject-ng-control';
import { NoopValueAccessorDirective } from './noop-value-accessor.directive';

@Component({
	selector: 'lu-custom-control',
	imports: [ReactiveFormsModule],
	hostDirectives: [NoopValueAccessorDirective],
	template: `<input #htmlInput [formControl]="ngControl.control" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomControl {
	readonly ngControl = injectNgControl();
	readonly htmlInput = viewChild<ElementRef<HTMLInputElement>>('htmlInput');
}

describe('injectNgControl', () => {
	function createHost<T extends { customControl: Signal<CustomControl | undefined> }>(cmp: Type<T>) {
		TestBed.configureTestingModule({
			imports: [cmp],
		});

		const fixture = TestBed.createComponent(cmp);
		const host = fixture.componentInstance;
		fixture.detectChanges();

		return { fixture, host, nativeInput: computed(() => host.customControl()!.htmlInput()!.nativeElement) };
	}

	it('should work when using ngModel', async () => {
		// Arrange
		@Component({
			selector: 'lu-ng-model-host',
			imports: [CustomControl, FormsModule],
			template: `<lu-custom-control [(ngModel)]="value" />`,
			changeDetection: ChangeDetectionStrategy.OnPush,
		})
		class NgModelHost {
			readonly value = signal('Initial');
			readonly customControl = viewChild(CustomControl);
		}

		const { fixture, host, nativeInput } = createHost(NgModelHost);
		fixture.detectChanges();
		await Promise.resolve(); // flush NgModel._updateValue microtask
		fixture.detectChanges();

		// Act
		const initialValue = nativeInput().value;
		nativeInput().value = 'Changed';
		nativeInput().dispatchEvent(new Event('input'));
		fixture.detectChanges();

		// Assert
		expect(initialValue).toBe('Initial');
		expect(host.value()).toBe('Changed');
	});

	it('should work when using formControl', () => {
		// Arrange
		@Component({
			selector: 'lu-form-control-host',
			imports: [CustomControl, ReactiveFormsModule],
			template: `<lu-custom-control [formControl]="control" />`,
			changeDetection: ChangeDetectionStrategy.OnPush,
		})
		class FormControlHost {
			readonly control = new FormControl('Initial');
			readonly customControl = viewChild(CustomControl);
		}

		const { fixture, host, nativeInput } = createHost(FormControlHost);

		// Act
		const initialValue = nativeInput().value;
		nativeInput().value = 'Changed';
		nativeInput().dispatchEvent(new Event('input'));
		fixture.detectChanges();

		// Assert
		expect(initialValue).toBe('Initial');
		expect(host.control.value).toBe('Changed');
	});

	it('should work when using formControlName', () => {
		// Arrange
		@Component({
			selector: 'lu-form-control-host',
			imports: [CustomControl, ReactiveFormsModule],
			template: `<div [formGroup]="form"><lu-custom-control formControlName="ctrl" /></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
		})
		class FormControlNameHost {
			readonly form = new FormGroup({ ctrl: new FormControl('Initial') });
			readonly customControl = viewChild(CustomControl);
		}

		const { fixture, host, nativeInput } = createHost(FormControlNameHost);

		// Act
		const initialValue = nativeInput().value;
		nativeInput().value = 'Changed';
		nativeInput().dispatchEvent(new Event('input'));
		fixture.detectChanges();

		// Assert
		expect(initialValue).toBe('Initial');
		expect(host.form.controls.ctrl.value).toBe('Changed');
	});

	it('should work when using formField', () => {
		// Arrange
		@Component({
			selector: 'lu-form-field-host',
			imports: [CustomControl, FormField],
			template: `<lu-custom-control [formField]="form" />`,
			changeDetection: ChangeDetectionStrategy.OnPush,
		})
		class FormFieldHost {
			readonly value = signal('Initial');
			readonly form = form(this.value);
			readonly customControl = viewChild(CustomControl);
		}

		const { fixture, host, nativeInput } = createHost(FormFieldHost);

		// Act
		const initialValue = nativeInput().value;
		nativeInput().value = 'Changed';
		nativeInput().dispatchEvent(new Event('input'));
		fixture.detectChanges();

		// Assert
		expect(initialValue).toBe('Initial');
		expect(host.value()).toBe('Changed');
	});

	it('should mirror field validity into the control when using formField', () => {
		// Arrange: field starts with a valid (non-empty) value
		@Component({
			selector: 'lu-form-field-validity-host',
			imports: [CustomControl, FormField],
			template: `<lu-custom-control [formField]="form" />`,
			changeDetection: ChangeDetectionStrategy.OnPush,
		})
		class FormFieldValidityHost {
			readonly value = signal('Bob');
			readonly form = form(this.value, (path) => {
				validate(path, ({ value }) => (value() ? null : [{ kind: 'required' as const, message: 'Required' }]));
			});
			readonly customControl = viewChild(CustomControl);
		}

		const { fixture, host } = createHost(FormFieldValidityHost);
		const control = host.customControl()?.ngControl.control;

		// Assert: a valid field leaves the control VALID (regression: setErrors([]) used to force INVALID)
		expect(control?.valid).toBe(true);
		expect(control?.errors).toBeNull();

		// Act: clear the field so the required validator fails
		host.value.set('');
		fixture.detectChanges();

		// Assert: the error is mirrored as a keyed ValidationErrors object, not a raw array
		expect(control?.invalid).toBe(true);
		expect(control?.errors).toEqual({ required: 'Required' });
	});
});
