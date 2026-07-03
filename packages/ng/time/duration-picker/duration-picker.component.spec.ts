import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ISO8601Duration } from '../core/date-primitives';
import { DurationPickerComponent } from './duration-picker.component';

@Component({
	selector: 'lu-duration-picker-test',
	imports: [DurationPickerComponent, FormFieldComponent],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-duration-picker [(value)]="value" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerTestComponent {
	value: ISO8601Duration | null = null;
}

@Component({
	selector: 'lu-duration-picker-max-test',
	imports: [DurationPickerComponent, FormFieldComponent],
	template: `
		<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
			<lu-duration-picker [(value)]="value" max="PT9999H" />
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DurationPickerMaxTestComponent {
	value: ISO8601Duration | null = null;
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

describe('DurationPickerComponent', () => {
	it('should render with empty value (null)', async () => {
		const fixture = TestBed.createComponent(DurationPickerTestComponent);
		fixture.componentInstance.value = null;
		fixture.detectChanges();
		await fixture.whenStable();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('');
		expect(minutes).toBe('');
	});

	it('should render with filled value', async () => {
		const fixture = TestBed.createComponent(DurationPickerTestComponent);
		fixture.componentInstance.value = 'PT1H';
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('1');
		expect(minutes).toBe('00');
	});

	it('should render with 1000 hours when max allows it', async () => {
		const fixture = TestBed.createComponent(DurationPickerMaxTestComponent);
		fixture.componentInstance.value = 'PT1000H';
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const { hours, minutes } = getDisplayTexts(fixture);
		expect(hours).toBe('1000');
		expect(minutes).toBe('00');
	});
});
