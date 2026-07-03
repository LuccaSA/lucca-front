import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ISO8601Time } from '../core/date-primitives';
import { TimePickerComponent } from './time-picker.component';

@Component({
	selector: 'lu-time-picker-test',
	imports: [TimePickerComponent, FormFieldComponent],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-time-picker [(value)]="value" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TimePickerTestComponent {
	value: ISO8601Time | null = null;
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
	it('should render with empty value (null)', async () => {
		const fixture = TestBed.createComponent(TimePickerTestComponent);
		fixture.componentInstance.value = null;
		fixture.detectChanges();
		await fixture.whenStable();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('––');
		expect(minutes).toBe('––');
	});

	it('should render with filled value', async () => {
		const fixture = TestBed.createComponent(TimePickerTestComponent);
		fixture.componentInstance.value = '12:30:00';
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('12');
		expect(minutes).toBe('30');
	});

	it('should display 00 for minutes after typing hours', async () => {
		const fixture = TestBed.createComponent(TimePickerTestComponent);
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
		const fixture = TestBed.createComponent(TimePickerTestComponent);
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
