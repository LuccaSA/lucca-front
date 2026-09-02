import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarMode } from '../calendar2/calendar-mode';
import { DATE_FORMAT, DateFormat } from '../date2.type';
import { DateInputComponent } from './date-input.component';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-date-input [formControl]="formControl" [min]="min" [max]="max" [mode]="mode" [format]="format" />`,
	imports: [FormsModule, ReactiveFormsModule, DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	formControl = new FormControl<Date | null>(null);
	min: Date | null = null;
	max: Date | null = null;
	mode: CalendarMode = 'day';
	format: DateFormat = DATE_FORMAT.DATE;
}

@Component({
	template: `<lu-date-input [formControl]="formControl" mode="week" [min]="min" />`,
	imports: [FormsModule, ReactiveFormsModule, DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class WeekHostComponent {
	formControl = new FormControl<Date | null>(null);
	min: Date | null = null;
}

describe('DateInputComponent', () => {
	let fixture: ComponentFixture<HostComponent>;

	function createHost(
		formControl: FormControl<Date | null> | FormControl<Date | string | null>,
		min: Date | null = null,
		max: Date | null = null,
		options: { mode?: CalendarMode; format?: DateFormat } = {},
	): HTMLInputElement {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		fixture = TestBed.createComponent(HostComponent);
		fixture.componentInstance.formControl = formControl as FormControl<Date | null>;
		fixture.componentInstance.min = min;
		fixture.componentInstance.max = max;
		fixture.componentInstance.mode = options.mode ?? 'day';
		fixture.componentInstance.format = options.format ?? DATE_FORMAT.DATE;
		fixture.detectChanges();

		return (fixture.nativeElement as HTMLElement).querySelector('[data-testid="lu-date-input"]') as HTMLInputElement;
	}

	function typeInElement(value: string, input: HTMLInputElement): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	it('should emit null when user clear the input', () => {
		const valueChanges = vi.fn();

		const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		const input = createHost(formControl);
		expect(input).toBeTruthy();

		typeInElement('', input);

		expect(formControl.value).toBeNull();
	});

	it('should emit the parsed date when user enters a valid date', () => {
		// Arrange
		const valueChanges = vi.fn();
		const formControl = new FormControl<Date | null>(null);
		formControl.valueChanges.subscribe((value) => valueChanges(value));
		const input = createHost(formControl);

		// Act
		typeInElement('15/03/2024', input);

		// Assert
		expect(formControl.value).toEqual(new Date(2024, 2, 15));
		expect(formControl.errors).toBeNull();
		expect(valueChanges).toHaveBeenCalledTimes(1);
	});

	it('should emit an ISO string when format is dateISO', () => {
		// Arrange
		const formControl = new FormControl<Date | string | null>(null);
		const input = createHost(formControl, null, null, { format: DATE_FORMAT.DATE_ISO });

		// Act
		typeInElement('15/03/2024', input);

		// Assert
		expect(formControl.value).toBe('2024-03-15');
	});

	it('should emit error when user enter a invalid date', () => {
		const valueChanges = vi.fn();

		const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		const input = createHost(formControl);
		expect(input).toBeTruthy();

		typeInElement('12', input);

		expect(valueChanges).toHaveBeenCalledTimes(1);
		expect(formControl.errors).toEqual({ date: true });
	});

	it('should not emit value at init if null value', fakeAsync(() => {
		const valueChanges = vi.fn();

		const formControl = new FormControl(null);
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		createHost(formControl);

		tick();
		expect(valueChanges).toHaveBeenCalledTimes(0);
	}));

	it('should not emit value at init if there is a value', fakeAsync(() => {
		const valueChanges = vi.fn();

		const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		createHost(formControl);

		tick();
		expect(valueChanges).toHaveBeenCalledTimes(0);
	}));

	describe('week mode', () => {
		let weekFixture: ComponentFixture<WeekHostComponent>;

		function createWeekHost(formControl: FormControl<Date | null>, min: Date | null = null): HTMLInputElement {
			TestBed.configureTestingModule({
				imports: [WeekHostComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
			});

			weekFixture = TestBed.createComponent(WeekHostComponent);
			weekFixture.componentInstance.formControl = formControl;
			weekFixture.componentInstance.min = min;
			weekFixture.detectChanges();

			return (weekFixture.nativeElement as HTMLElement).querySelector('[data-testid="lu-date-input"]') as HTMLInputElement;
		}

		function typeInWeekElement(value: string, input: HTMLInputElement): void {
			input.value = value;
			input.dispatchEvent(new Event('input'));
			weekFixture.detectChanges();
		}

		it('should handle typed in week number', () => {
			const formControl = new FormControl<Date | null>(null);
			const input = createWeekHost(formControl);

			// Week 30 2026 => Should be July, Thursday 23rd 2026
			typeInWeekElement('30 2026', input);

			expect(formControl.value).toEqual(new Date(2026, 6, 23));
		});

		it('should flag min error when the start of the selected week is before min', () => {
			// Value is Wednesday, min is the same Wednesday: the emitted value (Monday) would be before min
			const formControl = new FormControl<Date | null>(new Date(2024, 9, 16));
			createWeekHost(formControl, new Date(2024, 9, 16));

			expect(formControl.errors).toEqual({ min: true });
		});

		it('should accept a week whose start is after min', () => {
			const formControl = new FormControl<Date | null>(new Date(2024, 9, 16));
			createWeekHost(formControl, new Date(2024, 9, 14));

			expect(formControl.errors).toBeNull();
		});
	});

	describe('granularity', () => {
		it('should use a month/year placeholder and parse a month in month mode', () => {
			// Arrange
			const formControl = new FormControl<Date | null>(null);
			const input = createHost(formControl, null, null, { mode: 'month' });

			// Assert
			expect(input.getAttribute('placeholder')).toBe('MM/AAAA');

			// Act
			typeInElement('03/2024', input);

			// Assert
			expect(formControl.errors).toBeNull();
			expect(formControl.value?.getFullYear()).toBe(2024);
			expect(formControl.value?.getMonth()).toBe(2);
		});

		it('should use a year placeholder and parse a year in year mode', () => {
			// Arrange
			const formControl = new FormControl<Date | null>(null);
			const input = createHost(formControl, null, null, { mode: 'year' });

			// Assert
			expect(input.getAttribute('placeholder')).toBe('AAAA');

			// Act
			typeInElement('2024', input);

			// Assert
			expect(formControl.errors).toBeNull();
			expect(formControl.value?.getFullYear()).toBe(2024);
		});

		it('should compare min against the whole month in month mode', () => {
			// Arrange
			const formControl = new FormControl<Date | null>(null);
			const input = createHost(formControl, new Date('2024-03-15T00:00:00'), null, { mode: 'month' });

			// Act: same month as min, but an earlier day
			typeInElement('03/2024', input);

			// Assert
			expect(formControl.errors).toBeNull();

			// Act: previous month
			typeInElement('02/2024', input);

			// Assert
			expect(formControl.errors).toEqual({ min: true });
		});
	});

	describe('disabled state', () => {
		it('should disable the input when the control is disabled', () => {
			// Arrange
			const formControl = new FormControl<Date | null>(null);
			formControl.disable();

			// Act
			const input = createHost(formControl);

			// Assert
			expect(input.disabled).toBe(true);
		});

		it('should enable the input back when the control is enabled', () => {
			// Arrange
			const formControl = new FormControl<Date | null>(null);
			formControl.disable();
			const input = createHost(formControl);

			// Act
			formControl.enable();
			fixture.detectChanges();

			// Assert
			expect(input.disabled).toBe(false);
		});

		it('should disable the calendar toggle button when the control is disabled', () => {
			// Arrange
			const formControl = new FormControl<Date | null>(null);
			formControl.disable();

			// Act
			createHost(formControl);
			const toggle = (fixture.nativeElement as HTMLElement).querySelector('.textField-input-affix-toggle') as HTMLButtonElement;

			// Assert
			expect(toggle.disabled).toBe(true);
		});
	});

	it('should accept the min date itself even when min carries a time of day', () => {
		const formControl = new FormControl<Date | null>(null);
		const input = createHost(formControl, new Date('2024-01-01T14:00:00'));

		typeInElement('01/01/2024', input);

		expect(formControl.errors).toBeNull();
	});

	it('should reject a date before the min day', () => {
		const formControl = new FormControl<Date | null>(null);
		const input = createHost(formControl, new Date('2024-01-01T14:00:00'));

		typeInElement('31/12/2023', input);

		expect(formControl.errors).toEqual({ min: true });
	});

	it('should accept the max date itself even when the value carries a time of day', () => {
		const formControl = new FormControl<Date | null>(new Date('2024-01-31T18:00:00'));
		createHost(formControl, null, new Date('2024-01-31T00:00:00'));

		expect(formControl.errors).toBeNull();
	});

	it('should reject a date after the max day', () => {
		const formControl = new FormControl<Date | null>(null);
		const input = createHost(formControl, null, new Date('2024-01-31T00:00:00'));

		typeInElement('01/02/2024', input);

		expect(formControl.errors).toEqual({ max: true });
	});
});
