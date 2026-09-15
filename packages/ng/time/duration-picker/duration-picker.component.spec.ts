import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ISO8601Duration } from '../core/date-primitives';
import { DurationPickerComponent } from './duration-picker.component';

@Component({
	selector: 'lu-duration-picker-ngmodel-test',
	imports: [DurationPickerComponent, FormFieldComponent, FormsModule],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-duration-picker [(ngModel)]="value" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerNgModelTestComponent {
	value: string | null = null;
}

@Component({
	selector: 'lu-duration-picker-formcontrol-test',
	imports: [DurationPickerComponent, FormFieldComponent, ReactiveFormsModule],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-duration-picker [formControl]="control" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerFormControlTestComponent {
	control = new FormControl<string | null>(null);
}

@Component({
	selector: 'lu-duration-picker-formcontrol-max-test',
	imports: [DurationPickerComponent, FormFieldComponent, ReactiveFormsModule],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-duration-picker [formControl]="control" max="PT9999H" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerFormControlMaxTestComponent {
	control = new FormControl<string | null>(null);
}

@Component({
	selector: 'lu-duration-picker-configurable-test',
	imports: [DurationPickerComponent, ReactiveFormsModule],
	template: `<lu-duration-picker [formControl]="control" [max]="max" [step]="step" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerConfigurableTestComponent {
	control = new FormControl<string | null>(null);
	max: ISO8601Duration = 'PT99H';
	step: ISO8601Duration | null = null;
}

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

function createConfigurableHost(value: string | null, options: { max?: ISO8601Duration; step?: ISO8601Duration } = {}): ComponentFixture<DurationPickerConfigurableTestComponent> {
	TestBed.configureTestingModule({ imports: [DurationPickerConfigurableTestComponent] });
	const fixture = TestBed.createComponent(DurationPickerConfigurableTestComponent);
	fixture.componentInstance.control = new FormControl(value);
	fixture.componentInstance.max = options.max ?? 'PT99H';
	fixture.componentInstance.step = options.step ?? null;
	fixture.detectChanges();
	return fixture;
}

describe('DurationPickerComponent', () => {
	it('should render with empty ngModel (null)', async () => {
		const fixture = TestBed.createComponent(DurationPickerNgModelTestComponent);
		fixture.componentInstance.value = null;
		fixture.detectChanges();
		await fixture.whenStable();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('');
		expect(minutes).toBe('');
	});

	it('should render with filled ngModel', async () => {
		const fixture = TestBed.createComponent(DurationPickerNgModelTestComponent);
		fixture.componentInstance.value = 'PT1H';
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('1');
		expect(minutes).toBe('00');
	});

	it('should render with empty formControl (null)', async () => {
		const fixture = TestBed.createComponent(DurationPickerFormControlTestComponent);
		fixture.detectChanges();
		await fixture.whenStable();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('');
		expect(minutes).toBe('');
	});

	it('should render with filled formControl', async () => {
		const fixture = TestBed.createComponent(DurationPickerFormControlTestComponent);
		fixture.componentInstance.control = new FormControl('PT1H');
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('1');
		expect(minutes).toBe('00');
	});

	it('should render with 1000 hours when max allows it', async () => {
		const fixture = TestBed.createComponent(DurationPickerFormControlMaxTestComponent);
		fixture.componentInstance.control = new FormControl('PT1000H');
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('1000');
		expect(minutes).toBe('00');
	});

	describe('value emission', () => {
		it('should emit the ISO duration once hours and minutes are entered', async () => {
			// Arrange
			const fixture = TestBed.createComponent(DurationPickerNgModelTestComponent);
			fixture.detectChanges();
			await fixture.whenStable();
			const inputs = getInputs(fixture);

			// Act
			typeInPart('2', inputs.hours, fixture);
			typeInPart('30', inputs.minutes, fixture);
			await fixture.whenStable();

			// Assert
			expect(fixture.componentInstance.value).toBe('PT2H30M');
		});

		it('should emit the ISO duration on the form control once hours and minutes are entered', () => {
			// Arrange
			const fixture = createConfigurableHost(null);
			const inputs = getInputs(fixture);

			// Act
			typeInPart('2', inputs.hours, fixture);
			typeInPart('30', inputs.minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT2H30M');
		});

		it('should emit a durationChange event with its source when typing', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H0M');
			const picker = fixture.debugElement.query(By.directive(DurationPickerComponent)).componentInstance as DurationPickerComponent;
			const durationChange = vi.fn();
			picker.durationChange.subscribe((event) => durationChange(event));

			// Act
			typeInPart('30', getInputs(fixture).minutes, fixture);

			// Assert
			expect(durationChange).toHaveBeenCalledExactlyOnceWith({
				previousValue: 'PT1H0M',
				value: 'PT1H30M',
				source: 'input',
			});
		});
	});

	describe('max boundary', () => {
		it('should reset the hours to 0 when typing more hours than max allows', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H30M', { max: 'PT9H' });

			// Act
			typeInPart('10', getInputs(fixture).hours, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT0H30M');
		});

		it('should wrap back to 0 when incrementing the hours past max', () => {
			// Arrange
			const fixture = createConfigurableHost('PT9H0M', { max: 'PT9H' });

			// Act
			pressKey('ArrowUp', getInputs(fixture).hours, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT0H0M');
		});

		it('should keep a value equal to max untouched', () => {
			// Arrange & Act
			const fixture = createConfigurableHost('PT9H0M', { max: 'PT9H' });

			// Assert
			expect(getDisplayTexts(fixture)).toEqual({ hours: '9', minutes: '00' });
			expect(fixture.componentInstance.control.value).toBe('PT9H0M');
		});
	});

	describe('min boundary', () => {
		it('should wrap to max when decrementing the hours below zero', () => {
			// Arrange
			const fixture = createConfigurableHost('PT0H0M', { max: 'PT9H' });

			// Act
			pressKey('ArrowDown', getInputs(fixture).hours, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT9H0M');
		});

		it('should borrow from the hours when decrementing the minutes below zero', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H0M');

			// Act
			pressKey('ArrowDown', getInputs(fixture).minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT0H59M');
		});
	});

	describe('granularity', () => {
		it('should increment the minutes by the step', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H0M', { step: 'PT15M' });

			// Act
			pressKey('ArrowUp', getInputs(fixture).minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT1H15M');
		});

		it('should snap the minutes to the step when the current value is off-step', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H20M', { step: 'PT15M' });

			// Act
			pressKey('ArrowUp', getInputs(fixture).minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT1H30M');
		});

		it('should ignore the minutes arrows when the step has no minutes part', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H0M', { step: 'PT1H' });

			// Act
			pressKey('ArrowUp', getInputs(fixture).minutes, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT1H0M');
		});

		it('should increment the hours by the step', () => {
			// Arrange
			const fixture = createConfigurableHost('PT1H0M', { step: 'PT2H' });

			// Act
			pressKey('ArrowUp', getInputs(fixture).hours, fixture);

			// Assert
			expect(fixture.componentInstance.control.value).toBe('PT2H0M');
		});
	});
});
