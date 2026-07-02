import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { addMonths } from 'date-fns';
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
	template: `<lu-date-range-input [formControl]="formControl" />`,
	imports: [FormsModule, ReactiveFormsModule, DateRangeInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormControlHostComponent {
	formControl = new FormControl<DateRange | null>(null);
}

describe('DateRangeInputComponent', () => {
	function typeInElement(value: string, input: HTMLInputElement, fixture: ComponentFixture<unknown>): void {
		input.value = value;
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
	}

	it('should not called ngModelChange at init if null value', () => {
		const ngModelChangeCallback = jest.fn();

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
		const ngModelChangeCallback = jest.fn();

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
		const ngModelChangeCallback = jest.fn();

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
			start: new Date('2025-06-18T00:00:00.000Z'),
			scope: 'day',
		});
	});

	it('should not emit value at init if null value with reactive forms', fakeAsync(() => {
		const valueChanges = jest.fn();

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
		const valueChanges = jest.fn();

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
		const valueChanges = jest.fn();

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
});
