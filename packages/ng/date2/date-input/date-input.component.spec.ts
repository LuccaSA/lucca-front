import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-date-input [formControl]="formControl" />`,
	imports: [FormsModule, ReactiveFormsModule, DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	formControl = new FormControl<Date | null>(null);
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

	function createHost(formControl: FormControl<Date | null>): HTMLInputElement {
		TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		fixture = TestBed.createComponent(HostComponent);
		fixture.componentInstance.formControl = formControl;
		fixture.detectChanges();

		return (fixture.nativeElement as HTMLElement).querySelector('[data-testid="lu-date-input"]') as HTMLInputElement;
	}

	function typeInElement(value: string, input: HTMLInputElement): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	it('should emit null when user clear the input', () => {
		const valueChanges = jest.fn();

		const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		const input = createHost(formControl);
		expect(input).toBeTruthy();

		typeInElement('', input);

		expect(formControl.value).toBeNull();
	});

	it('should emit error when user enter a invalid date', () => {
		const valueChanges = jest.fn();

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
		const valueChanges = jest.fn();

		const formControl = new FormControl(null);
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		createHost(formControl);

		tick();
		expect(valueChanges).toHaveBeenCalledTimes(0);
	}));

	it('should not emit value at init if there is a value', fakeAsync(() => {
		const valueChanges = jest.fn();

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

		it('should normalize a typed date to the start of its week', () => {
			const formControl = new FormControl<Date | null>(null);
			const input = createWeekHost(formControl);

			// Wednesday, October 16th 2024 → week starts on Monday, October 14th in fr-FR
			typeInWeekElement('16/10/2024', input);

			expect(formControl.value).toEqual(new Date(2024, 9, 14));
		});

		it('should not emit when typing another day of the already selected week', () => {
			const valueChanges = jest.fn();
			const formControl = new FormControl<Date | null>(new Date(2024, 9, 16));
			formControl.valueChanges.subscribe(valueChanges);

			const input = createWeekHost(formControl);
			// Friday of the same week as the initial Wednesday
			typeInWeekElement('18/10/2024', input);

			expect(valueChanges).not.toHaveBeenCalled();
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
});
