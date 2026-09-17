import { ChangeDetectionStrategy, Component, LOCALE_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, startOfDay } from 'date-fns';
import { DateRange } from '../calendar2/date-range';
import { OpenDateRange } from '../calendar2/open-date-range';
import { getLocalizedDateFormat } from '../date-format';
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
	template: `<lu-date-range-input [(value)]="value" [disabled]="disabled()" [min]="min" [max]="max" [placeholder]="placeholder" />`,
	imports: [DateRangeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RangeHostComponent {
	value: DateRange | null = null;
	readonly disabled = signal(false);
	min: Date | null = null;
	max: Date | null = null;
	placeholder: string | undefined = undefined;
}

@Component({
	template: `<lu-filter-pill label="Période"><lu-date-range-input [(value)]="value" /></lu-filter-pill>`,
	imports: [DateRangeInputComponent, FilterPillComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FilterPillHostComponent {
	readonly value = signal<DateRange | null>(null);
}

describe('DateRangeInputComponent', () => {
	function typeInElement(value: string, input: HTMLInputElement, fixture: ComponentFixture<unknown>): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	function createRangeHost(
		value: DateRange | null = null,
		min: Date | null = null,
		max: Date | null = null,
		disabled = false,
		placeholder: string | undefined = undefined,
	): ComponentFixture<RangeHostComponent> {
		TestBed.configureTestingModule({
			imports: [RangeHostComponent],
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		});

		const fixture = TestBed.createComponent(RangeHostComponent);
		fixture.componentInstance.value = value;
		fixture.componentInstance.disabled.set(disabled);
		fixture.componentInstance.min = min;
		fixture.componentInstance.max = max;
		fixture.componentInstance.placeholder = placeholder;
		fixture.detectChanges();

		return fixture;
	}

	function getInput(fixture: ComponentFixture<unknown>, field: 'start' | 'end'): HTMLInputElement {
		return (fixture.nativeElement as HTMLElement).querySelector(`.mod-${field} > input`) as HTMLInputElement;
	}

	function createFilterPillHost(value: OpenDateRange | null = null): ComponentFixture<FilterPillHostComponent> {
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
		// The public type still requires a start date, consumers have to cast an open range the same way
		fixture.componentInstance.value.set(value as DateRange | null);
		fixture.detectChanges();

		return fixture;
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

	it('should emit valueChange when the user enters a date with a keyboard', () => {
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

	describe('placeholder', () => {
		it('should set the custom placeholder on both native inputs', () => {
			// Arrange
			const fixture = createRangeHost(null, null, null, false, 'jj-mm-aaaa');

			// Assert
			expect(getInput(fixture, 'start').placeholder).toBe('jj-mm-aaaa');
			expect(getInput(fixture, 'end').placeholder).toBe('jj-mm-aaaa');
		});

		it('should fall back to the localized date format on both native inputs when no placeholder is set', () => {
			// Arrange
			const fixture = createRangeHost();
			const expectedPlaceholder = getLocalizedDateFormat('fr-FR', 'day');

			// Assert
			expect(getInput(fixture, 'start').placeholder).toBe(expectedPlaceholder);
			expect(getInput(fixture, 'end').placeholder).toBe(expectedPlaceholder);
		});
	});

	it('should anchor the calendar on the end bound when the written range has no start', () => {
		const end = new Date(2025, 11, 31);
		// The component itself emits such a range when only the end field is filled
		const fixture = createRangeHost({ start: null, end } as unknown as DateRange);

		const dateRangeInput = fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;

		expect(dateRangeInput['currentDate']()).toEqual(startOfDay(end));
	});

	describe('range open on one of its bounds', () => {
		const noopPopover = { close: () => {} } as PopoverDirective;

		function getComponent(fixture: ComponentFixture<unknown>): DateRangeInputComponent {
			return fixture.debugElement.query(By.directive(DateRangeInputComponent)).componentInstance as DateRangeInputComponent;
		}

		it('should emit a start-only range when only the start date is filled', () => {
			// Arrange
			const fixture = createRangeHost();

			// Act
			typeInElement('18/06/2025', getInput(fixture, 'start'), fixture);

			// Assert
			expect(fixture.componentInstance.value).toEqual({ start: new Date(2025, 5, 18), scope: 'day' });
		});

		it('should fill the end bound when a date is picked while the end field is edited', () => {
			// Arrange
			const fixture = createRangeHost();
			const cmp = getComponent(fixture);
			cmp.editedField.set(1);

			// Act
			cmp.dateClicked(new Date(2025, 5, 20), noopPopover);

			// Assert
			expect(fixture.componentInstance.value).toEqual({ end: new Date(2025, 5, 20), scope: 'day' });
		});

		it('should move on to the start field once the end bound has been picked', () => {
			// Arrange
			const fixture = createRangeHost();
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
			const fixture = createRangeHost();
			const cmp = getComponent(fixture);
			cmp.editedField.set(1);
			cmp.dateClicked(new Date(2025, 5, 20), noopPopover);

			// Act
			cmp.dateClicked(new Date(2025, 5, 18), noopPopover);

			// Assert
			expect(fixture.componentInstance.value).toEqual({ start: new Date(2025, 5, 18), end: new Date(2025, 5, 20), scope: 'day' });
		});

		it('should invert the bounds when the start date picked on an end-only range is after the end date', () => {
			// Arrange
			const fixture = createRangeHost();
			const cmp = getComponent(fixture);
			cmp.editedField.set(1);
			cmp.dateClicked(new Date(2025, 5, 20), noopPopover);

			// Act
			cmp.dateClicked(new Date(2025, 5, 25), noopPopover);

			// Assert
			expect(fixture.componentInstance.value).toEqual({ start: new Date(2025, 5, 20), end: new Date(2025, 5, 25), scope: 'day' });
		});

		it('should close the calendar once the start date is picked on an end-only range', () => {
			// Arrange
			const fixture = createRangeHost();
			const cmp = getComponent(fixture);
			const popover = { close: vi.fn() } as unknown as PopoverDirective;
			cmp.editedField.set(1);
			cmp.dateClicked(new Date(2025, 5, 20), popover);

			// Act
			cmp.dateClicked(new Date(2025, 5, 25), popover);

			// Assert
			expect(popover.close).toHaveBeenCalledTimes(1);
			expect(cmp.editedField()).toBe(-1);
		});

		it('should not swap bounds on blur when the range has a single one', () => {
			// Arrange
			const fixture = createRangeHost();
			const endInput = getInput(fixture, 'end');

			// Act
			typeInElement('20/06/2025', endInput, fixture);
			endInput.dispatchEvent(new Event('blur'));
			fixture.detectChanges();

			// Assert
			expect(fixture.componentInstance.value).toEqual({ end: new Date(2025, 5, 20), scope: 'day' });
		});
	});

	describe('opening a filter pill with a single date selected', () => {
		// The pill popover is rendered in the overlay container, outside of the fixture
		function getPillInput(field: 'start' | 'end'): HTMLInputElement {
			return document.querySelector(`.mod-${field} > input`) as HTMLInputElement;
		}

		it('should initially focus the end field when only the start date is selected', () => {
			// Arrange
			createFilterPillHost({ start: new Date(2025, 5, 18), scope: 'day' });

			// Assert
			expect(getPillInput('end').hasAttribute('cdkFocusInitial')).toBe(true);
			expect(getPillInput('start').hasAttribute('cdkFocusInitial')).toBe(false);
		});

		it('should initially focus the start field when only the end date is selected', () => {
			// Arrange
			createFilterPillHost({ end: new Date(2025, 5, 20), scope: 'day' });

			// Assert
			expect(getPillInput('start').hasAttribute('cdkFocusInitial')).toBe(true);
			expect(getPillInput('end').hasAttribute('cdkFocusInitial')).toBe(false);
		});

		it('should not force the initial focus when the range is complete', () => {
			// Arrange
			createFilterPillHost({ start: new Date(2025, 5, 18), end: new Date(2025, 5, 20), scope: 'day' });

			// Assert
			expect(getPillInput('start').hasAttribute('cdkFocusInitial')).toBe(false);
			expect(getPillInput('end').hasAttribute('cdkFocusInitial')).toBe(false);
		});
	});

	describe('opening the calendar outside of a filter pill', () => {
		it('should not force the initial focus when a single date is selected', () => {
			// Arrange
			const fixture = createRangeHost({ start: new Date(2025, 5, 18), scope: 'day' } as DateRange);

			// Assert
			expect(getInput(fixture, 'end').hasAttribute('cdkFocusInitial')).toBe(false);
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
