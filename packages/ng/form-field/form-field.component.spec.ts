import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldIdDirective, TextInputComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from './form-field.component';

@Component({
	selector: 'lu-form-field-test',
	imports: [TextInputComponent, FormFieldComponent, ReactiveFormsModule],
	template: `
		<lu-form-field label="">
			<lu-text-input [formControl]="formControl()" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponentTestComponent {
	formControlToUse = input<'normal' | 'required'>('normal');
	formField = viewChild(FormFieldComponent);

	formControl = computed(() => (this.formControlToUse() === 'normal' ? this.normalFormControl : this.requiredFormControl));

	requiredFormControl = new FormControl('', { validators: Validators.required });
	normalFormControl = new FormControl('');
}

describe('FormFieldComponent', () => {
	let fixture: ComponentFixture<FormFieldComponentTestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FormFieldIdDirective],
		});

		fixture = TestBed.createComponent(FormFieldComponentTestComponent);
	});

	const isInputRequired = () => fixture.componentInstance.formField().isInputRequired();

	it('should not detect required validator', () => {
		// Act
		fixture.detectChanges();

		// Assert
		expect(isInputRequired()).toBe(false);
	});

	it('should detect required validator', () => {
		// Arrange
		fixture.componentRef.setInput('formControlToUse', 'required');

		// Act
		fixture.detectChanges();

		// Assert
		expect(isInputRequired()).toBe(true);
	});

	it('should handle required when going from normal to required', () => {
		// Arrange
		fixture.detectChanges();

		// Act
		fixture.componentRef.setInput('formControlToUse', 'required');
		fixture.detectChanges();

		// Assert
		expect(isInputRequired()).toBe(true);
	});

	it('should handle required when going from normal to required', () => {
		// Arrange
		fixture.componentRef.setInput('formControlToUse', 'required');
		fixture.detectChanges();

		// Act
		fixture.componentRef.setInput('formControlToUse', 'normal');
		fixture.detectChanges();

		// Assert
		expect(isInputRequired()).toBe(false);
	});
});
