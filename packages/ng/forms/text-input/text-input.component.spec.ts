import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input.component';

@Component({
	selector: 'lu-text-input-host',
	imports: [ReactiveFormsModule, TextInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<lu-text-input mask="00000" [formControl]="control" />`,
})
class MaskedTextInputHostComponent {
	readonly control = new FormControl<string | null>(null);
}

describe(TextInputComponent.name, () => {
	describe('with a mask', () => {
		let fixture: ComponentFixture<MaskedTextInputHostComponent>;
		let control: FormControl<string | null>;
		let inputElement: HTMLInputElement;
		let emittedValues: (string | null)[];

		const setup = () => {
			TestBed.configureTestingModule({
				imports: [MaskedTextInputHostComponent],
			});
			fixture = TestBed.createComponent(MaskedTextInputHostComponent);
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

		it('should mark the control dirty when the user types', () => {
			// Arrange
			setup();
			// Act
			inputElement.value = '12345';
			inputElement.dispatchEvent(new Event('input'));
			// Assert
			expect(control.dirty).toBe(true);
			expect(control.value).toBe('12345');
		});
	});
});
