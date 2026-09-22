import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, startOfDay } from 'date-fns';
import { DateRange } from '../calendar2/date-range';
import { DateRangeInputComponent } from './date-range-input.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-date-range-input [(ngModel)]="selected" (ngModelChange)="ngModelChangeCallback($event)" />`,
	imports: [FormsModule, ReactiveFormsModule, DateRangeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class NgModelHostComponent {
	selected: DateRange | null = null;
	ngModelChangeCallback = (_value: unknown): void => {};
}

@Component({
	template: `<lu-date-range-input [formControl]="formControl" [min]="min" [max]="max" />`,
	imports: [FormsModule, ReactiveFormsModule, DateRangeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormControlHostComponent {
	formControl = new FormControl<DateRange | null>(null);
	min: Date | null = null;
	max: Date | null = null;
}

@Component({
	template: `<lu-filter-pill label="Période"><lu-date-range-input [formControl]="formControl" /></lu-filter-pill>`,
	imports: [ReactiveFormsModule, DateRangeInputComponent, FilterPillComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FilterPillHostComponent {
	formControl = new FormControl<DateRange | null>(null);
}

describe('DateRangeInputComponent', () => {
	function typeInElement(value: string, input: HTMLInputElement, fixture: ComponentFixture<unknown>): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	function createFormControlHost(formControl: FormControl<DateRange | null>, min: Date | null = null, max: Date | null = null): ComponentFixture<FormControlHostComponent> {
		TestBed.configureTestingModule({
			imports: [FormControlHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(FormControlHostComponent);
		fixture.componentInstance.formControl = formControl;
		fixture.componentInstance.min = min;
		fixture.componentInstance.max = max;
		fixture.detectChanges();

		return fixture;
	}

	function getInput(fixture: ComponentFixture<unknown>, field: 'start' | 'end'): HTMLInputElement {
		return (fixture.nativeElement as HTMLElement).querySelector(`.mod-${field} > input`) as HTMLInputElement;
	}

	function createFilterPillHost(value: DateRange | null = null): ComponentFixture<FilterPillHostComponent> {
		TestBed.configureTestingModule({
			imports: [FilterPillHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(FilterPillHostComponent);
		fixture.detectChanges();
		// The pill projects the input inside its popover, so it has to be opened for the
		// input to register itself and provide the pill content
		(fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.filterPill')!.click();
		fixture.detectChanges();
		fixture.componentInstance.formControl.setValue(value);
		fixture.detectChanges();

		return fixture;
	}

	it('should not called ngModelChange at init if null value', () => {
		const ngModelChangeCallback = vi.fn();

		TestBed.configureTestingModule({
			imports: [NgModelHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(NgModelHostComponent);
		fixture.componentInstance.selected = null;
		fixture.componentInstance.ngModelChangeCallback = ngModelChangeCallback;
		fixture.detectChanges();

		expect(ngModelChangeCallback).toHaveBeenCalledTimes(0);
	});

	it('should not called ngModelChange at init if there is a value', fakeAsync(() => {
		const ngModelChangeCallback = vi.fn();

		const today = new Date();

		const selected: DateRange = {
			start: today,
			end: addMonths(today, 1),
		};

		TestBed.configureTestingModule({
			imports: [NgModelHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(NgModelHostComponent);
		fixture.componentInstance.selected = selected;
		fixture.componentInstance.ngModelChangeCallback = ngModelChangeCallback;
		fixture.detectChanges();

		tick();
		expect(ngModelChangeCallback).toHaveBeenCalledTimes(0);
	}));

	it('should called ngModelChange when the user enter a date with a keyboard', () => {
		const ngModelChangeCallback = vi.fn();

		TestBed.configureTestingModule({
			imports: [NgModelHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(NgModelHostComponent);
		fixture.componentInstance.selected = null;
		fixture.componentInstance.ngModelChangeCallback = ngModelChangeCallback;
		fixture.detectChanges();

		const input = (fixture.nativeElement as HTMLElement).querySelector('.mod-start > input') as HTMLInputElement;
		expect(input).toBeTruthy();

		typeInElement('18/06/2025', input, fixture);

		expect(ngModelChangeCallback).toHaveBeenCalledTimes(1);
		expect(ngModelChangeCallback).toHaveBeenCalledWith({
			start: new Date(2025, 5, 18),
			scope: 'day',
		});
	});

	it('should not emit value at init if null value with reactive forms', fakeAsync(() => {
		const valueChanges = vi.fn();

		const formControl = new FormControl(null);
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		TestBed.configureTestingModule({
			imports: [FormControlHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(FormControlHostComponent);
		fixture.componentInstance.formControl = formControl;
		fixture.detectChanges();

		tick();
		expect(valueChanges).toHaveBeenCalledTimes(0);
	}));

	it('should not emit value at init if there is a value with reactive forms', fakeAsync(() => {
		const valueChanges = vi.fn();

		const today = new Date();

		const selected: DateRange = {
			start: today,
			end: addMonths(today, 1),
		};

		const formControl = new FormControl(selected);
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		TestBed.configureTestingModule({
			imports: [FormControlHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(FormControlHostComponent);
		fixture.componentInstance.formControl = formControl;
		fixture.detectChanges();

		tick();
		expect(valueChanges).toHaveBeenCalledTimes(0);
	}));

	it('should emit value when the user enter a date with a keyboard with reactive forms', () => {
		const valueChanges = vi.fn();

		const formControl = new FormControl(null);
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		TestBed.configureTestingModule({
			imports: [FormControlHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(FormControlHostComponent);
		fixture.componentInstance.formControl = formControl;
		fixture.detectChanges();

		const input = (fixture.nativeElement as HTMLElement).querySelector('.mod-start > input') as HTMLInputElement;
		expect(input).toBeTruthy();

		typeInElement('18/06/2025', input, fixture);

		expect(valueChanges).toHaveBeenCalledTimes(1);
		expect(valueChanges).toHaveBeenCalledWith({
			start: new Date('2025-06-18T00:00:00.000Z'),
			scope: 'day',
		});
	});

	it('should emit value when the user enters only the end date with a keyboard', () => {
		// Arrange
		const valueChanges = vi.fn();
		const formControl = new FormControl<DateRange | null>(null);
		formControl.valueChanges.subscribe((value) => valueChanges(value));
		const fixture = createFormControlHost(formControl);

		// Act
		typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);

		// Assert
		expect(valueChanges).toHaveBeenCalledExactlyOnceWith({
			end: new Date(2025, 5, 20),
			scope: 'day',
		});
	});

	it('should emit the whole range once both dates are entered', () => {
		// Arrange
		const formControl = new FormControl<DateRange | null>(null);
		const fixture = createFormControlHost(formControl);

		// Act
		typeInElement('18/06/2025', getInput(fixture, 'start'), fixture);
		typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);

		// Assert
		expect(formControl.value).toEqual({
			start: new Date(2025, 5, 18),
			end: new Date(2025, 5, 20),
			scope: 'day',
		});
		expect(formControl.errors).toBeNull();
	});

	it('should emit null when the user clears both dates', () => {
		// Arrange
		const formControl = new FormControl<DateRange | null>({ start: new Date(2025, 5, 18), end: new Date(2025, 5, 20) });
		const fixture = createFormControlHost(formControl);

		// Act
		typeInElement('', getInput(fixture, 'start'), fixture);
		typeInElement('', getInput(fixture, 'end'), fixture);

		// Assert
		expect(formControl.value).toBeNull();
	});

	it('should swap start and end on blur when the range is reversed', () => {
		// Arrange
		const formControl = new FormControl<DateRange | null>(null);
		const fixture = createFormControlHost(formControl);
		const startInput = getInput(fixture, 'start');

		// Act
		typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);
		typeInElement('25/06/2025', startInput, fixture);
		startInput.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		// Assert
		expect(formControl.value).toEqual({
			start: new Date(2025, 5, 20),
			end: new Date(2025, 5, 25),
			scope: 'day',
		});
	});

	it('should report a date error when the start date is not parsable', () => {
		// Arrange
		const formControl = new FormControl<DateRange | null>(null);
		const fixture = createFormControlHost(formControl);

		// Act
		typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);
		typeInElement('12', getInput(fixture, 'start'), fixture);

		// Assert
		expect(formControl.errors).toEqual({ date: true });
	});

	describe('min / max', () => {
		it('should disable calendar cells before min', () => {
			// Arrange
			const fixture = createFormControlHost(new FormControl<DateRange | null>(null), new Date(2025, 5, 10));
			const cmp = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

			// Assert
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 9), 'day').disabled).toBe(true);
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 10), 'day').disabled).toBe(false);
		});

		it('should disable calendar cells after max', () => {
			// Arrange
			const fixture = createFormControlHost(new FormControl<DateRange | null>(null), null, new Date(2025, 5, 20));
			const cmp = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

			// Assert
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 21), 'day').disabled).toBe(true);
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 20), 'day').disabled).toBe(false);
		});
	});

	describe('disabled state', () => {
		it('should disable both inputs and the calendar toggle when the control is disabled', async () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			formControl.disable();

			// Act
			const fixture = createFormControlHost(formControl);
			await fixture.whenStable();

			// Assert
			expect(getInput(fixture, 'start').disabled).toBe(true);
			expect(getInput(fixture, 'end').disabled).toBe(true);
			expect(((fixture.nativeElement as HTMLElement).querySelector('.textField-input-affix-toggle') as HTMLButtonElement).disabled).toBe(true);
		});

		it('should enable both inputs back when the control is enabled', async () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			formControl.disable();
			const fixture = createFormControlHost(formControl);
			await fixture.whenStable();

			// Act
			formControl.enable();
			await fixture.whenStable();

			// Assert
			expect(getInput(fixture, 'start').disabled).toBe(false);
			expect(getInput(fixture, 'end').disabled).toBe(false);
		});
	});

	it('should anchor the calendar on the end bound when the written range has no start', () => {
		const formControl = new FormControl<DateRange | null>(null);

		TestBed.configureTestingModule({
			imports: [FormControlHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(FormControlHostComponent);
		fixture.componentInstance.formControl = formControl;
		fixture.detectChanges();

		const end = new Date(2025, 11, 31);
		// The component itself emits such a range when only the end field is filled
		formControl.setValue({ start: null, end } as unknown as DateRange);
		fixture.detectChanges();

		const dateRangeInput = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

		expect(dateRangeInput['currentDate']()).toEqual(startOfDay(end));
	});

	describe('range open on one of its bounds', () => {
		const noopPopover = { close: () => {} } as PopoverDirective;

		function getComponent(fixture: ComponentFixture<unknown>): DateRangeInputComponent {
			return fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;
		}

		// The validator is left untouched by this feature: a range still has to carry a start date
		// to be valid. Filter pills don't read the control's validity, so an "until" filter works
		// all the same
		it('should still report a date error when the range has no start date', () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			const fixture = createFormControlHost(formControl);

			// Act
			typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);

			// Assert
			expect(formControl.errors).toEqual({ date: true });
		});

		it('should keep the control valid when only the start date is filled', () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			const fixture = createFormControlHost(formControl);

			// Act
			typeInElement('18/06/2025', getInput(fixture, 'start'), fixture);

			// Assert
			expect(formControl.errors).toBeNull();
		});

		it('should fill the end bound when a date is picked while the end field is edited', () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			const fixture = createFormControlHost(formControl);
			const cmp = getComponent(fixture);
			cmp.editedField.set(1);

			// Act
			cmp.dateClicked(new Date(2025, 5, 20), noopPopover);

			// Assert
			expect(formControl.value).toEqual({ end: new Date(2025, 5, 20), scope: 'day' });
		});

		it('should move on to the start field once the end bound has been picked', () => {
			// Arrange
			const fixture = createFormControlHost(new FormControl<DateRange | null>(null));
			const cmp = getComponent(fixture);
			cmp.editedField.set(1);

			// Act
			cmp.dateClicked(new Date(2025, 5, 20), noopPopover);

			// Assert
			expect(cmp.editedField()).toBe(0);
			expect(cmp.highlightedField()).toBe(0);
		});

		it('should complete the range when a start date is picked on an end-only range', () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			const fixture = createFormControlHost(formControl);
			const cmp = getComponent(fixture);
			cmp.editedField.set(1);
			cmp.dateClicked(new Date(2025, 5, 20), noopPopover);

			// Act
			cmp.dateClicked(new Date(2025, 5, 18), noopPopover);

			// Assert
			expect(formControl.value).toEqual({ start: new Date(2025, 5, 18), end: new Date(2025, 5, 20), scope: 'day' });
		});

		it('should not swap bounds on blur when the range has a single one', () => {
			// Arrange
			const formControl = new FormControl<DateRange | null>(null);
			const fixture = createFormControlHost(formControl);
			const endInput = getInput(fixture, 'end');

			// Act
			typeInElement('20/06/2025', endInput, fixture);
			endInput.dispatchEvent(new Event('blur'));
			fixture.detectChanges();

			// Assert
			expect(formControl.value).toEqual({ end: new Date(2025, 5, 20), scope: 'day' });
		});
	});

	describe('filter pill display', () => {
		function getPillValue(fixture: ComponentFixture<unknown>): string {
			return (fixture.nativeElement as HTMLElement).querySelector('.filterPill-value')!.textContent!.replace(/\s+/g, ' ').trim();
		}

		it('should display both dates when the range is complete', () => {
			const fixture = createFilterPillHost({ start: new Date(2025, 5, 18), end: new Date(2025, 5, 20) });

			expect(getPillValue(fixture)).toContain('18/06/2025');
			expect(getPillValue(fixture)).toContain('20/06/2025');
		});

		it('should display "à partir du" when the range only has a start date', () => {
			const fixture = createFilterPillHost({ start: new Date(2025, 5, 18) });

			expect(getPillValue(fixture)).toBe('à partir du 18/06/2025');
		});

		it('should display "jusqu’au" when the range only has an end date', () => {
			const fixture = createFilterPillHost({ end: new Date(2025, 5, 20) });

			expect(getPillValue(fixture)).toBe('jusqu’au 20/06/2025');
		});
	});
});
