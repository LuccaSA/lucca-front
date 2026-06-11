import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input.component';

@Component({
	template: `<lu-date-input [formControl]="formControl" />`,
	imports: [FormsModule, ReactiveFormsModule, DateInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	formControl = new FormControl<Date | null>(null);
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
});
