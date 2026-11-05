import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatInputComponent } from './number-format-input.component';

// Node's ICU resolves RSD to 2 fraction digits where Chrome resolves it to 0.
// JPY resolves to 0 everywhere, so it reproduces the rounding in tests.
@Component({
	selector: 'lu-number-format-input-host',
	imports: [ReactiveFormsModule, NumberFormatInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-number-format-input formatStyle="currency" currency="JPY" [minimumFractionDigits]="minimumFractionDigits()" [maximumFractionDigits]="maximumFractionDigits()" [formControl]="control" />
	`,
})
class NumberFormatInputHostComponent {
	readonly minimumFractionDigits = input<number | undefined>(undefined);
	readonly maximumFractionDigits = input<number | undefined>(undefined);

	readonly control = new FormControl<number | null>(189.98);
}

describe(NumberFormatInputComponent.name, () => {
	let fixture: ComponentFixture<NumberFormatInputHostComponent>;
	let control: FormControl<number | null>;
	let inputElement: HTMLInputElement;

	const focusInput = () => inputElement.dispatchEvent(new Event('focus'));
	const blurInput = () => inputElement.dispatchEvent(new Event('blur'));
	const dispatchInput = () => inputElement.dispatchEvent(new Event('input'));

	const setup = (fractionDigits?: { minimumFractionDigits?: number; maximumFractionDigits?: number }) => {
		TestBed.configureTestingModule({
			imports: [NumberFormatInputHostComponent],
		});
		fixture = TestBed.createComponent(NumberFormatInputHostComponent);
		if (fractionDigits?.minimumFractionDigits !== undefined) {
			fixture.componentRef.setInput('minimumFractionDigits', fractionDigits.minimumFractionDigits);
		}
		if (fractionDigits?.maximumFractionDigits !== undefined) {
			fixture.componentRef.setInput('maximumFractionDigits', fractionDigits.maximumFractionDigits);
		}
		fixture.detectChanges();
		control = fixture.componentInstance.control;
		inputElement = (fixture.nativeElement as HTMLElement).querySelector('input')!;
	};

	describe('without fraction digits', () => {
		it('should round the value to the currency default on blur', () => {
			// Arrange
			setup();
			// Act
			blurInput();
			// Assert
			expect(inputElement.value).toBe('190');
		});

		it('should round the value to the currency default on focus', () => {
			// Arrange
			setup();
			// Act
			focusInput();
			// Assert
			expect(inputElement.value).toBe('190');
		});

		it('should save the rounded value after a keystroke', () => {
			// Arrange
			setup();
			focusInput();
			// Act
			dispatchInput();
			// Assert
			expect(control.value).toBe(190);
		});
	});

	describe('with maximumFractionDigits', () => {
		it('should keep the fraction digits on blur', () => {
			// Arrange
			setup({ maximumFractionDigits: 2 });
			// Act
			blurInput();
			// Assert
			expect(inputElement.value).toBe('189.98');
		});

		it('should keep the fraction digits on focus', () => {
			// Arrange
			setup({ maximumFractionDigits: 2 });
			// Act
			focusInput();
			// Assert
			expect(inputElement.value).toBe('189.98');
		});

		it('should save the value with its fraction digits after a keystroke', () => {
			// Arrange
			setup({ maximumFractionDigits: 2 });
			focusInput();
			// Act
			dispatchInput();
			// Assert
			expect(control.value).toBe(189.98);
		});
	});

	describe('with minimumFractionDigits', () => {
		it('should pad the fraction digits on blur', () => {
			// Arrange
			setup({ minimumFractionDigits: 2, maximumFractionDigits: 2 });
			control.setValue(190);
			// Act
			blurInput();
			// Assert
			expect(inputElement.value).toBe('190.00');
		});
	});
});
