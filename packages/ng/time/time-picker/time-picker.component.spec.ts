import { registerLocaleData } from '@angular/common';
import localesFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TimePickerComponent } from './time-picker.component';

@Component({
	selector: 'lu-time-picker-ngmodel-test',
	imports: [TimePickerComponent, FormFieldComponent, FormsModule],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-time-picker [(ngModel)]="value" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerNgModelTestComponent {
	value: string | null = null;
}

@Component({
	selector: 'lu-time-picker-formcontrol-test',
	imports: [TimePickerComponent, FormFieldComponent, ReactiveFormsModule],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-time-picker [formControl]="control" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerFormControlTestComponent {
	control = new FormControl<string | null>(null);
}

@Component({
	selector: 'lu-time-picker-standalone-test',
	imports: [TimePickerComponent, ReactiveFormsModule],
	template: `<lu-time-picker [formControl]="control" [forceMeridiemDisplay]="forceMeridiemDisplay" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerStandaloneTestComponent {
	control = new FormControl<string | null>(null);
	forceMeridiemDisplay: boolean | null = null;
}

registerLocaleData(localesFr);

const classSpan = '.timePicker-fieldset-group-textfield-display';
const classInput = '.timePicker-fieldset-group-textfield-input';

function getDisplayTexts(fixture: ComponentFixture<unknown>): { hours: string; minutes: string } {
	const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll(classSpan);
	expect(inputs.length).toBeGreaterThanOrEqual(2);
	return {
		hours: inputs[0].getAttribute('data-content-before')!,
		minutes: inputs[1].getAttribute('data-content-before')!,
	};
}

function getInputs(fixture: ComponentFixture<unknown>): { hours: HTMLInputElement; minutes: HTMLInputElement } {
	const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(classInput);
	return { hours: inputs[0], minutes: inputs[1] };
}

function typeInPart(value: string, input: HTMLInputElement, fixture: ComponentFixture<unknown>): void {
	input.value = value;
	input.dispatchEvent(new InputEvent('input', { data: value.slice(-1), inputType: 'insertText', bubbles: true }));
	fixture.detectChanges();
}

function pressKey(key: string, input: HTMLInputElement, fixture: ComponentFixture<unknown>): void {
	input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	fixture.detectChanges();
}

describe('TimePickerComponent', () => {
	it('should render with empty ngModel (null)', async () => {
		const fixture = TestBed.createComponent(TimePickerNgModelTestComponent);
		fixture.componentInstance.value = null;
		fixture.detectChanges();
		await fixture.whenStable();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('––');
		expect(minutes).toBe('––');
	});

	it('should render with filled ngModel', async () => {
		const fixture = TestBed.createComponent(TimePickerNgModelTestComponent);
		fixture.componentInstance.value = '12:30:00';
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('12');
		expect(minutes).toBe('30');
	});

	it('should render with empty formControl (null)', async () => {
		const fixture = TestBed.createComponent(TimePickerFormControlTestComponent);
		fixture.detectChanges();
		await fixture.whenStable();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('––');
		expect(minutes).toBe('––');
	});

	it('should render with filled formControl', async () => {
		const fixture = TestBed.createComponent(TimePickerFormControlTestComponent);
		fixture.componentInstance.control = new FormControl('12:30:00');
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('12');
		expect(minutes).toBe('30');
	});

	it('should display 00 for minutes after typing hours', async () => {
		const fixture = TestBed.createComponent(TimePickerNgModelTestComponent);
		fixture.detectChanges();
		await fixture.whenStable();

		const hoursInput = (fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset-group-textfield-input') as HTMLInputElement;
		hoursInput.value = '5';
		hoursInput.dispatchEvent(new InputEvent('input', { data: '5', inputType: 'insertText', bubbles: true }));
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('5');
		expect(minutes).toBe('00');
	});

	it('should register typing 0 in hours when the value is empty', async () => {
		const fixture = TestBed.createComponent(TimePickerNgModelTestComponent);
		fixture.detectChanges();
		await fixture.whenStable();

		expect(getDisplayTexts(fixture).hours).toBe('––');

		const hoursInput = (fixture.nativeElement as HTMLElement).querySelectorAll('.timePicker-fieldset-group-textfield-input')[0] as HTMLInputElement;
		hoursInput.value = '0';
		hoursInput.dispatchEvent(new InputEvent('input', { data: '0', inputType: 'insertText', bubbles: true }));
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		// 12-hour test locale: midnight (hours 0) displays as 12, proving the 0 registered.
		expect(hours).toBe('12');
		expect(minutes).toBe('00');
	});

	describe('value emission', () => {
		it('should emit the ISO time once hours and minutes are entered', async () => {
			// Arrange
			const fixture = TestBed.createComponent(TimePickerNgModelTestComponent);
			fixture.detectChanges();
			await fixture.whenStable();
			const inputs = getInputs(fixture);

			// Act
			typeInPart('9', inputs.hours, fixture);
			typeInPart('45', inputs.minutes, fixture);
			await fixture.whenStable();

			// Assert
			expect(fixture.componentInstance.value).toBe('09:45:00');
		});

		it('should emit the ISO time on the form control once hours and minutes are entered', async () => {
			// Arrange
			const valueChanges = vi.fn();
			const fixture = TestBed.createComponent(TimePickerFormControlTestComponent);
			fixture.componentInstance.control.valueChanges.subscribe((value) => valueChanges(value));
			fixture.detectChanges();
			await fixture.whenStable();
			const inputs = getInputs(fixture);

			// Act
			typeInPart('9', inputs.hours, fixture);
			typeInPart('45', inputs.minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('09:45:00');
			expect(valueChanges).toHaveBeenLastCalledWith('09:45:00');
		});

		it('should emit a timeChange event with its source when typing', async () => {
			// Arrange
			TestBed.configureTestingModule({ imports: [TimePickerStandaloneTestComponent] });
			const fixture = TestBed.createComponent(TimePickerStandaloneTestComponent);
			fixture.detectChanges();
			await fixture.whenStable();
			const picker = fixture.debugElement.query(By.directive(TimePickerComponent)).componentInstance as TimePickerComponent;
			const timeChange = vi.fn();
			picker.timeChange.subscribe((event) => timeChange(event));

			// Act
			typeInPart('9', getInputs(fixture).hours, fixture);

			// Assert
			expect(timeChange).toHaveBeenCalledExactlyOnceWith({
				previousValue: '––:––:––',
				value: '09:00:00',
				source: 'input',
			});
		});
	});

	describe('keyboard navigation', () => {
		function createStandaloneHost(value: string | null): ComponentFixture<TimePickerStandaloneTestComponent> {
			TestBed.configureTestingModule({ imports: [TimePickerStandaloneTestComponent] });
			const fixture = TestBed.createComponent(TimePickerStandaloneTestComponent);
			fixture.componentInstance.control = new FormControl(value);
			fixture.detectChanges();
			return fixture;
		}

		it('should increment the hours on ArrowUp', () => {
			// Arrange
			const fixture = createStandaloneHost('10:30:00');

			// Act
			pressKey('ArrowUp', getInputs(fixture).hours, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('11:30:00');
		});

		it('should decrement the minutes on ArrowDown', () => {
			// Arrange
			const fixture = createStandaloneHost('10:30:00');

			// Act
			pressKey('ArrowDown', getInputs(fixture).minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('10:29:00');
		});

		it('should move the focus from hours to minutes on ArrowRight', () => {
			// Arrange
			const fixture = createStandaloneHost('10:30:00');
			const inputs = getInputs(fixture);
			inputs.hours.focus();

			// Act
			pressKey('ArrowRight', inputs.hours, fixture);

			// Assert
			expect(document.activeElement).toBe(inputs.minutes);
		});

		it('should move the focus from minutes back to hours on ArrowLeft', () => {
			// Arrange
			const fixture = createStandaloneHost('10:30:00');
			const inputs = getInputs(fixture);
			inputs.minutes.focus();

			// Act
			pressKey('ArrowLeft', inputs.minutes, fixture);

			// Assert
			expect(document.activeElement).toBe(inputs.hours);
		});

		it('should reset the minutes to 0 on Backspace', () => {
			// Arrange
			const fixture = createStandaloneHost('10:30:00');

			// Act
			pressKey('Backspace', getInputs(fixture).minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('10:00:00');
		});
	});

	describe('locale and meridiem', () => {
		function createLocalizedHost(locale: string, value: string, forceMeridiemDisplay: boolean | null = null): ComponentFixture<TimePickerStandaloneTestComponent> {
			TestBed.configureTestingModule({
				imports: [TimePickerStandaloneTestComponent],
				providers: [{ provide: LOCALE_ID, useValue: locale }],
			});
			const fixture = TestBed.createComponent(TimePickerStandaloneTestComponent);
			fixture.componentInstance.control = new FormControl(value);
			fixture.componentInstance.forceMeridiemDisplay = forceMeridiemDisplay;
			fixture.detectChanges();
			return fixture;
		}

		it('should display 24-hour time and no meridiem in a 24-hour locale', () => {
			// Act
			const fixture = createLocalizedHost('fr-FR', '13:30:00');

			// Assert
			expect(getDisplayTexts(fixture)).toEqual({ hours: '13', minutes: '30' });
			expect((fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset-meridiem')).toBeNull();
		});

		it('should display 12-hour time and a meridiem in a 12-hour locale', () => {
			// Act
			const fixture = createLocalizedHost('en-US', '13:30:00');

			// Assert
			expect(getDisplayTexts(fixture)).toEqual({ hours: '1', minutes: '30' });
			expect((fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset-meridiem')).not.toBeNull();
		});

		it('should force the meridiem display in a 24-hour locale when asked to', () => {
			// Act
			const fixture = createLocalizedHost('fr-FR', '13:30:00', true);

			// Assert
			expect(getDisplayTexts(fixture).hours).toBe('1');
			expect((fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset-meridiem')).not.toBeNull();
		});

		it('should hide the meridiem in a 12-hour locale when asked to', () => {
			// Act
			const fixture = createLocalizedHost('en-US', '13:30:00', false);

			// Assert
			expect(getDisplayTexts(fixture).hours).toBe('13');
			expect((fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset-meridiem')).toBeNull();
		});

		it('should switch the hours to the afternoon when picking PM', () => {
			// Arrange
			const fixture = createLocalizedHost('en-US', '01:30:00');
			const pm = (fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset-meridiem-post-input') as HTMLInputElement;

			// Act
			pm.click();
			fixture.detectChanges();

			// Assert
			expect(fixture.componentInstance.control.value).toBe('13:30:00');
		});
	});

	describe('disabled state', () => {
		it('should disable the fieldset when the control is disabled', async () => {
			// Arrange
			TestBed.configureTestingModule({ imports: [TimePickerStandaloneTestComponent] });
			const fixture = TestBed.createComponent(TimePickerStandaloneTestComponent);
			fixture.componentInstance.control = new FormControl('10:30:00');
			fixture.componentInstance.control.disable();

			// Act
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(((fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset') as HTMLFieldSetElement).disabled).toBe(true);
		});

		it('should enable the fieldset back when the control is enabled', async () => {
			// Arrange
			TestBed.configureTestingModule({ imports: [TimePickerStandaloneTestComponent] });
			const fixture = TestBed.createComponent(TimePickerStandaloneTestComponent);
			fixture.componentInstance.control = new FormControl('10:30:00');
			fixture.componentInstance.control.disable();
			fixture.detectChanges();
			await fixture.whenStable();

			// Act
			fixture.componentInstance.control.enable();
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(((fixture.nativeElement as HTMLElement).querySelector('.timePicker-fieldset') as HTMLFieldSetElement).disabled).toBe(false);
		});
	});
});
