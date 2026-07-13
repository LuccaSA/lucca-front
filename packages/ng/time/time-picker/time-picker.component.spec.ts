import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

const classSpan = '.timePicker-fieldset-group-textfield-display';

function getDisplayTexts(fixture: ComponentFixture<unknown>): { hours: string; minutes: string } {
	const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll(classSpan);
	expect(inputs.length).toBeGreaterThanOrEqual(2);
	return {
		hours: inputs[0].getAttribute('data-content-before')!,
		minutes: inputs[1].getAttribute('data-content-before')!,
	};
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
});
