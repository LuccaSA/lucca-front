import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, LOCALE_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { addDays } from 'date-fns';
import { CalendarMode } from '../calendar2/calendar-mode';
import { DATE_FORMAT, DateFormat } from '../date2.type';
import { DateInputComponent } from './date-input.component';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-date-input [(value)]="value" [disabled]="disabled()" [min]="min" [max]="max" [mode]="mode" [format]="format" [humanized]="humanized" />`,
	imports: [DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	value: Date | null = null;
	readonly disabled = signal(false);
	min: Date | null = null;
	max: Date | null = null;
	mode: CalendarMode = 'day';
	format: DateFormat = DATE_FORMAT.DATE;
	humanized = false;
}

@Component({
	template: `<lu-date-input [(value)]="value" mode="week" [min]="min" />`,
	imports: [DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class WeekHostComponent {
	value: Date | null = null;
	min: Date | null = null;
}

describe('DateInputComponent', () => {
	let fixture: ComponentFixture<HostComponent>;

	function createHost(
		value: Date | null = null,
		min: Date | null = null,
		max: Date | null = null,
		options: { mode?: CalendarMode; format?: DateFormat; humanized?: boolean; disabled?: boolean } = {},
	): HTMLInputElement {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		fixture = TestBed.createComponent(HostComponent);
		fixture.componentInstance.value = value;
		fixture.componentInstance.disabled.set(options.disabled ?? false);
		fixture.componentInstance.min = min;
		fixture.componentInstance.max = max;
		fixture.componentInstance.mode = options.mode ?? 'day';
		fixture.componentInstance.format = options.format ?? DATE_FORMAT.DATE;
		fixture.componentInstance.humanized = options.humanized ?? false;
		fixture.detectChanges();

		return (fixture.nativeElement as HTMLElement).querySelector('[data-testid="lu-date-input"]') as HTMLInputElement;
	}

	function typeInElement(value: string, input: HTMLInputElement): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	it('should emit null when user clear the input', () => {
		const input = createHost(null);
		expect(input).toBeTruthy();

		typeInElement('', input);

		expect(fixture.componentInstance.value).toBeNull();
	});

	it('should emit the parsed date when user enters a valid date', () => {
		// Arrange
		const input = createHost(null);

		// Act
		typeInElement('15/03/2024', input);

		// Assert
		expect(fixture.componentInstance.value).toEqual(new Date(2024, 2, 15));
	});

	it('should not emit value at init if null value', fakeAsync(() => {
		createHost(null);

		tick();
	}));

	it('should not emit value at init if there is a value', fakeAsync(() => {
		createHost(null);

		tick();
	}));

	describe('week mode', () => {
		let weekFixture: ComponentFixture<WeekHostComponent>;

		function createWeekHost(value: Date | null = null, min: Date | null = null): HTMLInputElement {
			TestBed.configureTestingModule({
				imports: [WeekHostComponent],
				providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
			});

			weekFixture = TestBed.createComponent(WeekHostComponent);
			weekFixture.componentInstance.value = value;
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
			const input = createWeekHost(null);

			// Week 30 2026 => Should be July, Thursday 23rd 2026
			typeInWeekElement('30 2026', input);

			expect(weekFixture.componentInstance.value).toEqual(new Date(2026, 6, 23));
		});
	});

	describe('granularity', () => {
		it('should use a month/year placeholder and parse a month in month mode', () => {
			// Arrange
			const input = createHost(null, null, null, { mode: 'month' });

			// Assert
			expect(input.getAttribute('placeholder')).toBe('MM/AAAA');

			// Act
			typeInElement('03/2024', input);

			// Assert
			expect(fixture.componentInstance.value?.getFullYear()).toBe(2024);
			expect(fixture.componentInstance.value?.getMonth()).toBe(2);
		});

		it('should use a year placeholder and parse a year in year mode', () => {
			// Arrange
			const input = createHost(null, null, null, { mode: 'year' });

			// Assert
			expect(input.getAttribute('placeholder')).toBe('AAAA');

			// Act
			typeInElement('2024', input);

			// Assert
			expect(fixture.componentInstance.value?.getFullYear()).toBe(2024);
		});
	});

	describe('disabled state', () => {
		it('should disable the input when disabled is set', () => {
			// Arrange
			// Act
			const input = createHost(null, null, null, { disabled: true });

			// Assert
			expect(input.disabled).toBe(true);
		});

		it('should enable the input back when disabled is unset', async () => {
			// Arrange
			const input = createHost(null, null, null, { disabled: true });

			// Act
			fixture.componentInstance.disabled.set(false);
			await fixture.whenStable();

			// Assert
			expect(input.disabled).toBe(false);
		});

		it('should disable the calendar toggle button when disabled is set', () => {
			// Arrange
			// Act
			createHost(null, null, null, { disabled: true });
			const toggle = (fixture.nativeElement as HTMLElement).querySelector('.textField-input-affix-toggle') as HTMLButtonElement;

			// Assert
			expect(toggle.disabled).toBe(true);
		});
	});

	describe('humanized', () => {
		const numericFormat = (date: Date) => new Intl.DateTimeFormat('fr-FR').format(date);

		it('should display the natural language value when the input is not focused', () => {
			const today = new Date();

			const input = createHost(today, null, null, { humanized: true });

			expect(input.value).toBe('Aujourd\u2019hui');
		});

		it('should display the numeric value while the input is focused', () => {
			const today = new Date();
			const input = createHost(today, null, null, { humanized: true });

			input.dispatchEvent(new Event('focus'));
			fixture.detectChanges();

			expect(input.value).toBe(numericFormat(today));
		});

		it('should display the natural language value back on blur', () => {
			const tomorrow = addDays(new Date(), 1);
			const input = createHost(tomorrow, null, null, { humanized: true });

			input.dispatchEvent(new Event('focus'));
			fixture.detectChanges();
			input.dispatchEvent(new Event('blur'));
			fixture.detectChanges();

			expect(input.value).toBe('Demain');
		});

		it('should keep the numeric value for a date that has no natural language equivalent', () => {
			const inThreeDays = addDays(new Date(), 3);

			const input = createHost(inThreeDays, null, null, { humanized: true });

			expect(input.value).toBe(numericFormat(inThreeDays));
		});

		it('should display the short month name in month mode', () => {
			const input = createHost(new Date(2026, 2, 15), null, null, { humanized: true, mode: 'month' });

			expect(input.value).toBe('Mars 2026');
		});

		it('should keep the numeric value when the option is off', () => {
			const today = new Date();

			const input = createHost(today);

			expect(input.value).toBe(numericFormat(today));
		});
	});
});
