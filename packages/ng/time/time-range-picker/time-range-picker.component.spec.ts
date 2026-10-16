import { registerLocaleData } from '@angular/common';
import localesFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, input, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { TimeRangePickerRange } from './time-range-picker';
import { TimeRangePickerComponent } from './time-range-picker.component';

@Component({
	selector: 'lu-time-range-picker-host',
	imports: [ReactiveFormsModule, FormFieldComponent, TimeRangePickerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Horaires">
			<lu-time-range-picker [formControl]="formControl" [disabled]="disabled()" />
		</lu-form-field>
	`,
})
class TimeRangePickerHostComponent {
	readonly disabled = input(false);

	formControl = new FormControl<TimeRangePickerRange | null>({ start: '09:00:00', end: '17:30:00' });
}

@Component({
	selector: 'lu-time-range-picker-ng-model-host',
	imports: [FormsModule, TimeRangePickerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <lu-time-range-picker [(ngModel)]="range" /> `,
})
class TimeRangePickerNgModelHostComponent {
	range: TimeRangePickerRange | null = { start: '09:00:00', end: '17:30:00' };
}

registerLocaleData(localesFr);

function getTimePickers(fixture: ComponentFixture<unknown>): { start: TimePickerComponent; end: TimePickerComponent } {
	const [start, end] = fixture.debugElement.queryAll(By.directive(TimePickerComponent)).map((el) => el.componentInstance as TimePickerComponent);
	return { start, end };
}

describe(TimeRangePickerComponent.name, () => {
	let fixture: ComponentFixture<TimeRangePickerHostComponent>;
	let host: TimeRangePickerHostComponent;

	function setup(locale = 'en-US'): void {
		TestBed.configureTestingModule({
			imports: [TimeRangePickerHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: locale }],
		});
		fixture = TestBed.createComponent(TimeRangePickerHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	}

	function getTimePickerFieldsets(): HTMLFieldSetElement[] {
		return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLFieldSetElement>('lu-time-picker fieldset'));
	}

	describe('value', () => {
		beforeEach(() => setup());

		it('should pass the start and end of the control value to the time pickers', () => {
			// Act
			const { start, end } = getTimePickers(fixture);

			// Assert
			expect(start.value()).toBe('09:00:00');
			expect(end.value()).toBe('17:30:00');
		});

		it('should emit the merged range when the start, then the end changes', () => {
			// Arrange
			const { start, end } = getTimePickers(fixture);

			// Act
			start.value.set('08:00:00');

			// Assert
			expect(host.formControl.value).toEqual({ start: '08:00:00', end: '17:30:00' });

			// Act
			end.value.set('12:15:00');

			// Assert
			expect(host.formControl.value).toEqual({ start: '08:00:00', end: '12:15:00' });
		});

		it('should require both start and end', () => {
			// Act & Assert
			host.formControl.setValue(null);
			expect(host.formControl.errors).toBeNull();

			host.formControl.setValue({ start: '09:00:00' });
			expect(host.formControl.errors).toEqual({ time: true });

			host.formControl.setValue({ start: '09:00:00', end: '17:30:00' });
			expect(host.formControl.errors).toBeNull();
		});
	});

	describe('touched state', () => {
		beforeEach(() => setup());

		function focusTimePickerInput(picker: 'start' | 'end', type: 'focusin' | 'focusout'): void {
			const index = picker === 'start' ? 0 : 1;
			const timePickerInput = (fixture.nativeElement as HTMLElement).querySelectorAll('lu-time-picker')[index].querySelector('input')!;
			timePickerInput.dispatchEvent(new FocusEvent(type, { bubbles: true }));
		}

		it('should not mark the control as touched when the focus moves from the start to the end', async () => {
			// Act
			focusTimePickerInput('start', 'focusin');
			focusTimePickerInput('start', 'focusout');
			focusTimePickerInput('end', 'focusin');
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(host.formControl.touched).toBe(false);
		});

		it('should mark the control as touched when the focus leaves the whole range', async () => {
			// Act
			focusTimePickerInput('end', 'focusin');
			focusTimePickerInput('end', 'focusout');
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(host.formControl.touched).toBe(true);
		});
	});

	describe('disabled state', () => {
		beforeEach(() => setup());

		it('should disable both time pickers when the control is disabled', () => {
			// Act
			host.formControl.disable();
			fixture.detectChanges();

			// Assert
			expect(getTimePickerFieldsets().map((fieldset) => fieldset.disabled)).toEqual([true, true]);
		});

		it('should disable both time pickers with the disabled input', () => {
			// Act
			fixture.componentRef.setInput('disabled', true);
			fixture.detectChanges();

			// Assert
			expect(getTimePickerFieldsets().map((fieldset) => fieldset.disabled)).toEqual([true, true]);
		});
	});

	describe('labels', () => {
		it('should prefix the start and end labels with the form field label in French', () => {
			// Arrange
			setup('fr');

			// Act
			const { start, end } = getTimePickers(fixture);

			// Assert
			expect(start.label()).toBe('Horaires (début)');
			expect(end.label()).toBe('Horaires (fin)');
		});

		it('should not prefix the start and end labels in other languages', () => {
			// Arrange
			setup('en-US');

			// Act
			const { start, end } = getTimePickers(fixture);

			// Assert
			expect(start.label()).toBe('(start)');
			expect(end.label()).toBe('(end)');
		});
	});
});

describe(`${TimeRangePickerComponent.name} with ngModel`, () => {
	it('should keep the initial ngModel value', async () => {
		// Arrange
		TestBed.configureTestingModule({ imports: [TimeRangePickerNgModelHostComponent] });
		const fixture = TestBed.createComponent(TimeRangePickerNgModelHostComponent);

		// Act
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		// Assert
		const { start, end } = getTimePickers(fixture);
		expect(fixture.componentInstance.range).toEqual({ start: '09:00:00', end: '17:30:00' });
		expect(start.value()).toBe('09:00:00');
		expect(end.value()).toBe('17:30:00');
	});
});
