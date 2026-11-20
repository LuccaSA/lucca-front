import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

@Component({
	selector: 'lu-text-input-host',
	imports: [ReactiveFormsModule, TextInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<lu-text-input [mask]="mask" [formControl]="control" />`,
})
class MaskedTextInputHostComponent {
	mask = '00000';
	readonly control = new FormControl<string | null>(null);
}

describe(TextInputComponent.name, () => {
	describe('with a mask', () => {
		let fixture: ComponentFixture<MaskedTextInputHostComponent>;
		let control: FormControl<string | null>;
		let inputElement: HTMLInputElement;
		let emittedValues: (string | null)[];

		const setup = (mask?: string) => {
			TestBed.configureTestingModule({
				imports: [MaskedTextInputHostComponent],
			});
			fixture = TestBed.createComponent(MaskedTextInputHostComponent);
			if (mask) {
				fixture.componentInstance.mask = mask;
			}
			fixture.detectChanges();
			control = fixture.componentInstance.control;
			inputElement = (fixture.nativeElement as HTMLElement).querySelector('input')!;
			emittedValues = [];
			control.valueChanges.subscribe((value) => emittedValues.push(value));
		};

		it('should emit a value set by code only once', async () => {
			// Arrange
			setup();
			// Act
			control.setValue('12345');
			fixture.detectChanges();
			await fixture.whenStable();
			// Assert
			expect(inputElement.value).toBe('12345');
			expect(emittedValues).toEqual(['12345']);
		});

		it('should keep the control pristine after a value set by code', async () => {
			// Arrange
			setup();
			// Act
			control.setValue('12345');
			fixture.detectChanges();
			await fixture.whenStable();
			// Assert
			expect(inputElement.value).toBe('12345');
			expect(control.dirty).toBe(false);
		});

		it('should keep the control pristine after a reset to a value', async () => {
			// Arrange
			setup();
			// Act
			control.reset('54321');
			fixture.detectChanges();
			await fixture.whenStable();
			// Assert
			expect(inputElement.value).toBe('54321');
			expect(control.dirty).toBe(false);
		});

		it('should emit a value reset by code only once', async () => {
			// Arrange
			setup();
			// Act
			control.reset('54321');
			fixture.detectChanges();
			await fixture.whenStable();
			// Assert
			expect(emittedValues).toEqual(['54321']);
		});

		it('should keep the control pristine when the mask truncates a value set by code', async () => {
			// Arrange
			setup();
			// Act
			control.setValue('123456');
			fixture.detectChanges();
			await fixture.whenStable();
			// Assert
			expect(inputElement.value).toBe('12345');
			expect(control.value).toBe('12345');
			expect(control.dirty).toBe(false);
			// ngx-mask 22.2.5 writes the masked value back through onChange, so a value it changes is emitted twice.
			expect(emittedValues).toEqual(['12345', '12345']);
		});

		it('should emit a value set by code only once with a mask containing literals', async () => {
			// Arrange
			setup('00/00/0000');
			// Act
			control.setValue('01012020');
			fixture.detectChanges();
			await fixture.whenStable();
			// Assert
			expect(inputElement.value).toBe('01/01/2020');
			expect(emittedValues).toEqual(['01012020']);
			expect(control.dirty).toBe(false);
		});

		it('should mark the control dirty and mask the value when the user types', () => {
			// Arrange
			setup();
			// Act
			inputElement.value = 'a1b2c3d4e5f6';
			inputElement.dispatchEvent(new Event('input'));
			// Assert
			// The display is not asserted: under happy-dom, ngx-mask 22.2.5 leaves the input empty after an input event.
			expect(control.dirty).toBe(true);
			expect(control.value).toBe('12345');
		});
	});
});
