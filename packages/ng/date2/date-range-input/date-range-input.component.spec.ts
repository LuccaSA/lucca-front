import { ChangeDetectionStrategy, Component, LOCALE_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { addMonths, startOfDay } from 'date-fns';
import { DateRange } from '../calendar2/date-range';
import { DateRangeInputComponent } from './date-range-input.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeFr, 'fr-FR');

@Component({
	template: `<lu-date-range-input [value]="selected" (valueChange)="valueChangeCallback($event)" />`,
	imports: [DateRangeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ValueHostComponent {
	selected: DateRange | null = null;
	valueChangeCallback = (_value: unknown): void => {};
}

@Component({
	template: `<lu-date-range-input [(value)]="value" [disabled]="disabled()" [min]="min" [max]="max" />`,
	imports: [DateRangeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RangeHostComponent {
	value: DateRange | null = null;
	readonly disabled = signal(false);
	min: Date | null = null;
	max: Date | null = null;
}

describe('DateRangeInputComponent', () => {
	function typeInElement(value: string, input: HTMLInputElement, fixture: ComponentFixture<unknown>): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	function createRangeHost(value: DateRange | null = null, min: Date | null = null, max: Date | null = null, disabled = false): ComponentFixture<RangeHostComponent> {
		TestBed.configureTestingModule({
			imports: [RangeHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(RangeHostComponent);
		fixture.componentInstance.value = value;
		fixture.componentInstance.disabled.set(disabled);
		fixture.componentInstance.min = min;
		fixture.componentInstance.max = max;
		fixture.detectChanges();

		return fixture;
	}

	function getInput(fixture: ComponentFixture<unknown>, field: 'start' | 'end'): HTMLInputElement {
		return (fixture.nativeElement as HTMLElement).querySelector(`.mod-${field} > input`) as HTMLInputElement;
	}

	it('should not emit valueChange at init if null value', () => {
		const valueChangeCallback = vi.fn();

		TestBed.configureTestingModule({
			imports: [ValueHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(ValueHostComponent);
		fixture.componentInstance.selected = null;
		fixture.componentInstance.valueChangeCallback = valueChangeCallback;
		fixture.detectChanges();

		expect(valueChangeCallback).toHaveBeenCalledTimes(0);
	});

	it('should not emit valueChange at init if there is a value', fakeAsync(() => {
		const valueChangeCallback = vi.fn();

		const today = new Date();

		const selected: DateRange = {
			start: today,
			end: addMonths(today, 1),
		};

		TestBed.configureTestingModule({
			imports: [ValueHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(ValueHostComponent);
		fixture.componentInstance.selected = selected;
		fixture.componentInstance.valueChangeCallback = valueChangeCallback;
		fixture.detectChanges();

		tick();
		expect(valueChangeCallback).toHaveBeenCalledTimes(0);
	}));

	it('should called ngModelChange when the user enter a date with a keyboard', () => {
		const valueChangeCallback = vi.fn();

		TestBed.configureTestingModule({
			imports: [ValueHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(ValueHostComponent);
		fixture.componentInstance.selected = null;
		fixture.componentInstance.valueChangeCallback = valueChangeCallback;
		fixture.detectChanges();

		const input = (fixture.nativeElement as HTMLElement).querySelector('.mod-start > input') as HTMLInputElement;
		expect(input).toBeTruthy();

		typeInElement('18/06/2025', input, fixture);

		expect(valueChangeCallback).toHaveBeenCalledTimes(1);
		expect(valueChangeCallback).toHaveBeenCalledWith({
			start: new Date(2025, 5, 18),
			scope: 'day',
		});
	});

	it('should emit value when the user enters only the end date with a keyboard', () => {
		// Arrange
		const valueChanges = vi.fn();
		const fixture = createRangeHost(null);
		(fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent).value.subscribe((value) => valueChanges(value));

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
		const fixture = createRangeHost(null);

		// Act
		typeInElement('18/06/2025', getInput(fixture, 'start'), fixture);
		typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);

		// Assert
		expect(fixture.componentInstance.value).toEqual({
			start: new Date(2025, 5, 18),
			end: new Date(2025, 5, 20),
			scope: 'day',
		});
	});

	it('should emit null when the user clears both dates', () => {
		// Arrange
		const fixture = createRangeHost({ start: new Date(2025, 5, 18), end: new Date(2025, 5, 20) });

		// Act
		typeInElement('', getInput(fixture, 'start'), fixture);
		typeInElement('', getInput(fixture, 'end'), fixture);

		// Assert
		expect(fixture.componentInstance.value).toBeNull();
	});

	it('should swap start and end on blur when the range is reversed', () => {
		// Arrange
		const fixture = createRangeHost(null);
		const startInput = getInput(fixture, 'start');

		// Act
		typeInElement('20/06/2025', getInput(fixture, 'end'), fixture);
		typeInElement('25/06/2025', startInput, fixture);
		startInput.dispatchEvent(new Event('blur'));
		fixture.detectChanges();

		// Assert
		expect(fixture.componentInstance.value).toEqual({
			start: new Date(2025, 5, 20),
			end: new Date(2025, 5, 25),
			scope: 'day',
		});
	});

	describe('min / max', () => {
		it('should disable calendar cells before min', () => {
			// Arrange
			const fixture = createRangeHost(null, new Date(2025, 5, 10));
			const cmp = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

			// Assert
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 9), 'day').disabled).toBe(true);
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 10), 'day').disabled).toBe(false);
		});

		it('should disable calendar cells after max', () => {
			// Arrange
			const fixture = createRangeHost(null, null, new Date(2025, 5, 20));
			const cmp = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

			// Assert
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 21), 'day').disabled).toBe(true);
			expect(cmp.combinedGetCellInfo(new Date(2025, 5, 20), 'day').disabled).toBe(false);
		});
	});

	describe('disabled state', () => {
		it('should disable both inputs and the calendar toggle when disabled is set', async () => {
			// Arrange
			// Act
			const fixture = createRangeHost(null, null, null, true);
			await fixture.whenStable();

			// Assert
			expect(getInput(fixture, 'start').disabled).toBe(true);
			expect(getInput(fixture, 'end').disabled).toBe(true);
			expect(((fixture.nativeElement as HTMLElement).querySelector('.textField-input-affix-toggle') as HTMLButtonElement).disabled).toBe(true);
		});

		it('should enable both inputs back when disabled is unset', async () => {
			// Arrange
			const fixture = createRangeHost(null, null, null, true);
			await fixture.whenStable();

			// Act
			fixture.componentInstance.disabled.set(false);
			await fixture.whenStable();

			// Assert
			expect(getInput(fixture, 'start').disabled).toBe(false);
			expect(getInput(fixture, 'end').disabled).toBe(false);
		});
	});

	it('should anchor the calendar on the end bound when the written range has no start', () => {
		const end = new Date(2025, 11, 31);
		// The component itself emits such a range when only the end field is filled
		const fixture = createRangeHost({ start: null, end } as unknown as DateRange);

		const dateRangeInput = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

		expect(dateRangeInput['currentDate']()).toEqual(startOfDay(end));
	});
});
