import { DateRangeInputComponent } from './date-range-input.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRange } from '../calendar2/date-range';
import { addMonths } from 'date-fns/';
import { fakeAsync } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

describe('DateRangeInputComponent', () => {
	let spectator: SpectatorHost<DateRangeInputComponent>;

	const createHost = createHostFactory({
		component: DateRangeInputComponent,
		imports: [FormsModule, ReactiveFormsModule],
		providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
	});

	it('should not called ngModelChange at init if null value', () => {
		const ngModelChangeCallback = jest.fn();

		spectator = createHost(`<lu-date-range-input [(ngModel)]="selected" (ngModelChange)="ngModelChangeCallback($event)"></lu-date-range-input>`, {
			hostProps: {
				selected: null,
				ngModelChangeCallback,
			},
		});

		expect(ngModelChangeCallback).toBeCalledTimes(0);
	});

	it('should not called ngModelChange at init if there is a value', fakeAsync(() => {
		const ngModelChangeCallback = jest.fn();

		const today = new Date();

		const selected: DateRange = {
			start: today,
			end: addMonths(today, 1),
		};

		spectator = createHost(`<lu-date-range-input [(ngModel)]="selected" (ngModelChange)="ngModelChangeCallback($event)"></lu-date-range-input>`, {
			hostProps: {
				selected,
				ngModelChangeCallback,
			},
		});

		spectator.tick();
		expect(ngModelChangeCallback).toBeCalledTimes(0);
	}));

	it('should called ngModelChange when the user enter a date with a keyboard', () => {
		const ngModelChangeCallback = jest.fn();

		spectator = createHost(`<lu-date-range-input [(ngModel)]="selected" (ngModelChange)="ngModelChangeCallback($event)"></lu-date-range-input>`, {
			hostProps: {
				selected: null,
				ngModelChangeCallback,
			},
		});

		const input = spectator.query('.mod-start > input');
		expect(input).toBeTruthy();

		spectator.typeInElement('18/06/2025', input);

		expect(ngModelChangeCallback).toBeCalledTimes(1);
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

		spectator = createHost(`<lu-date-range-input [formControl]="formControl"></lu-date-range-input>`, {
			hostProps: {
				formControl,
			},
		});

		spectator.tick();
		expect(valueChanges).toBeCalledTimes(0);
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

		spectator = createHost(`<lu-date-range-input [formControl]="formControl"></lu-date-range-input>`, {
			hostProps: {
				formControl,
			},
		});

		spectator.tick();
		expect(valueChanges).toBeCalledTimes(0);
	}));

	it('should emit value when the user enter a date with a keyboard with reactive forms', () => {
		const valueChanges = jest.fn();

		const formControl = new FormControl(null);
		formControl.valueChanges.subscribe((value) => {
			valueChanges(value);
		});

		spectator = createHost(`<lu-date-range-input [formControl]="formControl"></lu-date-range-input>`, {
			hostProps: {
				formControl,
			},
		});

		const input = spectator.query('.mod-start > input');
		expect(input).toBeTruthy();

		spectator.typeInElement('18/06/2025', input);

		expect(valueChanges).toBeCalledTimes(1);
		expect(valueChanges).toHaveBeenCalledWith({
			start: new Date('2025-06-18T00:00:00.000Z'),
			scope: 'day',
		});
	});
});
