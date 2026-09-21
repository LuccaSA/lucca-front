import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberInputComponent } from './phone-number-input.component';

@Component({
	selector: 'lu-phone-number-input-host',
	imports: [ReactiveFormsModule, PhoneNumberInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-phone-number-input [formControl]="formControl" /> `,
})
class PhoneNumberInputHostComponent {
	formControl = new FormControl<string | null>('+33612345678');

	readonly phoneNumberInput = viewChild.required(PhoneNumberInputComponent);
}

describe(PhoneNumberInputComponent.name, () => {
	let fixture: ComponentFixture<PhoneNumberInputHostComponent>;
	let host: PhoneNumberInputHostComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PhoneNumberInputHostComponent],
		});

		fixture = TestBed.createComponent(PhoneNumberInputHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should update the control when a number is typed', () => {
		// Act
		host.phoneNumberInput().updateNumber('0698765432');
		fixture.detectChanges();

		// Assert
		expect(host.formControl.value).toBe('+33698765432');
	});

	it('should empty the control when the number is erased', () => {
		// Act
		host.phoneNumberInput().updateNumber('');
		fixture.detectChanges();

		// Assert
		expect(host.formControl.value).toBe('');
	});
});
