import { ChangeDetectionStrategy, Component, input, LOCALE_ID, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { PhoneNumberInputComponent } from './phone-number-input.component';
import { PhoneNumberInputAutocomplete } from './phone-number-input.type';
import { CountryCode } from './types';

@Component({
	selector: 'lu-phone-number-input-host',
	imports: [ReactiveFormsModule, PhoneNumberInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-phone-number-input [formControl]="formControl" [country]="country()" [autocomplete]="autocomplete()" (countryChange)="countryChange($event)" /> `,
})
class PhoneNumberInputHostComponent {
	readonly country = input<CountryCode>();
	readonly autocomplete = input<PhoneNumberInputAutocomplete>();

	formControl = new FormControl<string | null>('+33612345678');
	countryChange = vi.fn();

	readonly phoneNumberInput = viewChild.required(PhoneNumberInputComponent);
}

describe(PhoneNumberInputComponent.name, () => {
	let fixture: ComponentFixture<PhoneNumberInputHostComponent>;
	let host: PhoneNumberInputHostComponent;

	function getNumberInput(): HTMLInputElement {
		return (fixture.nativeElement as HTMLElement).querySelector('input#phoneNumberFieldsetTextfieldInput')!;
	}

	function type(text: string): void {
		const numberInput = getNumberInput();
		numberInput.value = text;
		numberInput.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	async function getDisplayedNumber(): Promise<string> {
		fixture.detectChanges();
		await fixture.whenStable();
		return getNumberInput().value;
	}

	describe('value', () => {
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

		it('should display the national format and deduce the country from an E.164 value', async () => {
			// Assert
			expect(await getDisplayedNumber()).toBe('06 12 34 56 78');
			expect(host.phoneNumberInput().countryCode()).toBe('FR');
		});

		it('should normalize a national value written programmatically to E.164', () => {
			// Arrange
			fixture.componentRef.setInput('country', 'FR');
			fixture.detectChanges();

			// Act
			host.formControl.setValue('0698765432');

			// Assert
			expect(host.formControl.value).toBe('+33698765432');
		});

		it('should flag an invalid number with the libphonenumber reason', () => {
			// Act & Assert
			host.formControl.setValue('+3361');
			expect(host.formControl.errors).toEqual({ validPhoneNumber: 'TOO_SHORT' });

			host.formControl.setValue('+33012345678');
			expect(host.formControl.errors).toEqual({ validPhoneNumber: 'INVALID' });

			host.formControl.setValue('+33612345678');
			expect(host.formControl.errors).toBeNull();
		});

		it('should not throw on an unparsable value', () => {
			// Act
			expect(() => host.formControl.setValue('abc')).not.toThrow();
			expect(() => type('abc')).not.toThrow();

			// Assert
			expect(host.formControl.value).toBe('abc');
			expect(host.formControl.errors).toEqual({ validPhoneNumber: 'NOT_A_NUMBER' });
		});

		it('should switch country and emit countryChange when an international number of another country is typed', () => {
			// Act
			type('+4915123456789');

			// Assert
			expect(host.formControl.value).toBe('+4915123456789');
			expect(host.phoneNumberInput().countryCode()).toBe('DE');
			expect(host.countryChange).toHaveBeenCalledExactlyOnceWith('DE');
		});

		it('should re-emit the number with the new prefix when the country is changed', () => {
			// Arrange
			type('0470123456');

			// Act
			host.phoneNumberInput().updatePrefix({ country: 'BE', prefix: '32', name: 'Belgium' });
			fixture.detectChanges();

			// Assert
			expect(host.formControl.value).toBe('+32470123456');
			expect(host.formControl.touched).toBe(true);
			expect(host.countryChange).toHaveBeenCalledExactlyOnceWith('BE');
		});

		it('should format the number on blur and mark the control as touched', async () => {
			// Arrange
			type('0612');

			// Act
			getNumberInput().dispatchEvent(new Event('blur'));

			// Assert
			expect(await getDisplayedNumber()).toBe('06 12');
			expect(host.formControl.touched).toBe(true);
		});

		it.each([
			{ autocomplete: undefined, countryCode: null, number: null },
			{ autocomplete: 'tel', countryCode: 'tel-country-code', number: 'tel-national' },
			{ autocomplete: 'off', countryCode: 'off', number: 'off' },
		] as const)('should set the autocomplete tokens for autocomplete=$autocomplete', ({ autocomplete, countryCode, number }) => {
			// Act
			fixture.componentRef.setInput('autocomplete', autocomplete);
			fixture.detectChanges();

			// Assert
			const select = (fixture.nativeElement as HTMLElement).querySelector('lu-simple-select input');
			expect(select?.getAttribute('autocomplete')).toBe(countryCode);
			expect(getNumberInput().getAttribute('autocomplete')).toBe(number);
		});
	});

	describe('countries', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [PhoneNumberInputHostComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
			});

			fixture = TestBed.createComponent(PhoneNumberInputHostComponent);
			host = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should sort countries by their translated name', () => {
			// Act
			const names = host
				.phoneNumberInput()
				.prefixEntries.map((entry) => entry.name)
				.filter((name) => ['Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne'].includes(name!));

			// Assert
			expect(names).toEqual(['Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne']);
		});
	});
});
