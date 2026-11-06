import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NumberFormatDirective } from './number-format.directive';
import { NumberFormatOptions } from './number-format.models';

@Component({
	selector: 'lu-number-format-test',
	imports: [NumberFormatDirective, ReactiveFormsModule],
	template: `<input luNumberFormatInput [formatOptions]="formatOptions()" [formControl]="control" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class NumberFormatTestComponent {
	readonly formatOptions = input<NumberFormatOptions>({ locale: 'en-us', style: 'decimal' });

	readonly control = new FormControl<number | null>(null);
}

describe(NumberFormatDirective.name, () => {
	let fixture: ComponentFixture<NumberFormatTestComponent>;
	let control: FormControl<number | null>;
	let inputElement: HTMLInputElement;

	const typeInput = (value: string) => {
		inputElement.value = value;
		inputElement.dispatchEvent(new Event('input'));
	};
	const focusInput = () => inputElement.dispatchEvent(new Event('focus'));
	const blurInput = () => inputElement.dispatchEvent(new Event('blur'));

	const setup = (formatOptions?: NumberFormatOptions) => {
		if (formatOptions) {
			fixture.componentRef.setInput('formatOptions', formatOptions);
		}
		fixture.detectChanges();
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NumberFormatTestComponent],
		});

		fixture = TestBed.createComponent(NumberFormatTestComponent);
		control = fixture.componentInstance.control;
		inputElement = (fixture.nativeElement as HTMLElement).querySelector('input')!;
	});

	describe('writeValue', () => {
		it('should display an empty string when the value is null', () => {
			// Act
			setup();
			// Assert
			expect(inputElement.value).toBe('');
		});

		it('should display the blur format when the input is not focused', () => {
			// Arrange
			setup();
			// Act
			control.setValue(1234.5);
			// Assert
			expect(inputElement.value).toBe('1,234.5');
		});

		it('should display the focus format when the input is focused', () => {
			// Arrange
			setup();
			focusInput();
			// Act
			control.setValue(1234.5);
			// Assert
			expect(inputElement.value).toBe('1234.5');
		});

		it('should display negative values with a typographic minus sign on blur', () => {
			// Arrange
			setup();
			// Act
			control.setValue(-42);
			// Assert
			expect(inputElement.value).toBe('−42');
		});

		it('should use the locale of the format options', () => {
			// Arrange
			setup({ locale: 'fr-fr', style: 'decimal' });
			// Act
			control.setValue(1234.5);
			// Assert
			expect(inputElement.value).toBe('1 234,5');
		});

		it('should only display the digits of a currency value', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'currency', currency: 'EUR' });
			// Act
			control.setValue(12.3);
			// Assert
			expect(inputElement.value).toBe('12.30');
		});

		it('should clamp the displayed value to the max', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'decimal', max: 100 });
			// Act
			control.setValue(150);
			// Assert
			expect(inputElement.value).toBe('100');
		});

		it('should clamp the displayed value to the min', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'decimal', min: 10 });
			// Act
			control.setValue(2);
			// Assert
			expect(inputElement.value).toBe('10');
		});
	});

	describe('focus / blur', () => {
		it('should switch to the focus format on focus', () => {
			// Arrange
			setup();
			control.setValue(1234.5);
			// Act
			focusInput();
			// Assert
			expect(inputElement.value).toBe('1234.5');
		});

		it('should switch back to the blur format on blur', () => {
			// Arrange
			setup();
			control.setValue(1234.5);
			focusInput();
			// Act
			blurInput();
			// Assert
			expect(inputElement.value).toBe('1,234.5');
		});

		it('should prefill a minus sign on focus when the range only allows negative values', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'decimal', max: -1 });
			// Act
			focusInput();
			// Assert
			expect(inputElement.value).toBe('-');
		});

		it('should mark the control as touched on blur', () => {
			// Arrange
			setup();
			focusInput();
			// Act
			blurInput();
			// Assert
			expect(control.touched).toBe(true);
		});

		it('should not mark the control as touched on focus', () => {
			// Arrange
			setup();
			// Act
			focusInput();
			// Assert
			expect(control.touched).toBe(false);
		});
	});

	describe('input', () => {
		it('should propagate the parsed value to the control', () => {
			// Arrange
			setup();
			focusInput();
			// Act
			typeInput('1234.5');
			// Assert
			expect(control.value).toBe(1234.5);
			expect(control.dirty).toBe(true);
		});

		it('should accept a comma as decimal delimiter', () => {
			// Arrange
			setup();
			focusInput();
			// Act
			typeInput('12,5');
			// Assert
			expect(control.value).toBe(12.5);
			expect(inputElement.value).toBe('12.5');
		});

		it('should clean out invalid characters from the input', () => {
			// Arrange
			setup();
			focusInput();
			// Act
			typeInput('1a2b3');
			// Assert
			expect(inputElement.value).toBe('123');
			expect(control.value).toBe(123);
		});

		it('should truncate fraction digits above maximumFractionDigits', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'decimal', maximumFractionDigits: 1 });
			focusInput();
			// Act
			typeInput('1.234');
			// Assert
			expect(inputElement.value).toBe('1.2');
			expect(control.value).toBe(1.2);
		});

		it('should keep an incomplete input while propagating a null value', () => {
			// Arrange
			setup();
			control.setValue(5);
			focusInput();
			// Act
			typeInput('-');
			// Assert
			expect(inputElement.value).toBe('-');
			expect(control.value).toBeNull();
		});

		it('should propagate null when the input is cleared', () => {
			// Arrange
			setup();
			control.setValue(5);
			focusInput();
			// Act
			typeInput('');
			// Assert
			expect(control.value).toBeNull();
		});

		it('should divide the typed value by 100 for the percent style', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'percent' });
			focusInput();
			// Act
			typeInput('25');
			// Assert
			expect(control.value).toBe(0.25);
			expect(inputElement.value).toBe('25');
		});

		it('should clamp the typed value to the max', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'decimal', max: 100 });
			focusInput();
			// Act
			typeInput('150');
			// Assert
			expect(inputElement.value).toBe('100');
			expect(control.value).toBe(100);
		});

		it('should remove the minus sign when the range only allows positive values', () => {
			// Arrange
			setup({ locale: 'en-us', style: 'decimal', min: 0 });
			focusInput();
			// Act
			typeInput('-5');
			// Assert
			expect(inputElement.value).toBe('5');
			expect(control.value).toBe(5);
		});

		it('should display the blur format of the typed value after blur', () => {
			// Arrange
			setup();
			focusInput();
			typeInput('1234.5');
			// Act
			blurInput();
			// Assert
			expect(inputElement.value).toBe('1,234.5');
		});
	});

	describe('setDisabledState', () => {
		it('should disable the input when the control is disabled', () => {
			// Arrange
			setup();
			// Act
			control.disable();
			// Assert
			expect(inputElement.disabled).toBe(true);
		});

		it('should enable the input when the control is enabled again', () => {
			// Arrange
			setup();
			control.disable();
			// Act
			control.enable();
			// Assert
			expect(inputElement.disabled).toBe(false);
		});
	});
});
