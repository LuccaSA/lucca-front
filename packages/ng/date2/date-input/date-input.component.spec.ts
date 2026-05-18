import { LOCALE_ID } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { DateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
	let spectator: SpectatorHost<DateInputComponent>;

	const createHost = createHostFactory({
		component: DateInputComponent,
		imports: [FormsModule, ReactiveFormsModule],
		providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
	});

	describe('CVA value update on clear', () => {
		it('should emit null when user clear the input', () => {
			const valueChanges = jest.fn();

			const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
			formControl.valueChanges.subscribe((value) => {
				valueChanges(value);
			});

			spectator = createHost(`<lu-date-input [formControl]="formControl"></lu-date-input>`, {
				hostProps: { formControl },
			});

			const input = spectator.query('[data-testid="lu-date-input"]') as HTMLInputElement;
			expect(input).toBeTruthy();

			spectator.typeInElement('', input);

			expect(formControl.value).toBeNull();
		});

		it('should emit error when user enter a invalid date', () => {
			const valueChanges = jest.fn();

			const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
			formControl.valueChanges.subscribe((value) => {
				valueChanges(value);
			});

			spectator = createHost(`<lu-date-input [formControl]="formControl"></lu-date-input>`, {
				hostProps: { formControl },
			});

			const input = spectator.query('[data-testid="lu-date-input"]') as HTMLInputElement;
			expect(input).toBeTruthy();

			spectator.typeInElement('12', input);

			expect(valueChanges).toHaveBeenCalledTimes(1);
			expect(formControl.errors).toEqual({ date: true });
		});

		it('should not emit value at init if null value', fakeAsync(() => {
			const valueChanges = jest.fn();

			const formControl = new FormControl(null);
			formControl.valueChanges.subscribe((value) => {
				valueChanges(value);
			});

			spectator = createHost(`<lu-date-input [formControl]="formControl"></lu-date-input>`, {
				hostProps: { formControl },
			});

			spectator.tick();
			expect(valueChanges).toHaveBeenCalledTimes(0);
		}));

		it('should not emit value at init if there is a value', fakeAsync(() => {
			const valueChanges = jest.fn();

			const formControl = new FormControl(new Date('2024-01-01T00:00:00.000Z'));
			formControl.valueChanges.subscribe((value) => {
				valueChanges(value);
			});

			spectator = createHost(`<lu-date-input [formControl]="formControl"></lu-date-input>`, {
				hostProps: { formControl },
			});

			spectator.tick();
			expect(valueChanges).toHaveBeenCalledTimes(0);
		}));
	});
});
