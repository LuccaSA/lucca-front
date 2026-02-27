import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
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

const classSpan = '.timePicker-fieldset-group-textfield-display';

function getDisplayTexts(fixture: ComponentFixture<unknown>): { hours: string; minutes: string } {
	const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll(classSpan);
	expect(inputs.length).toBeGreaterThanOrEqual(2);
	return {
		hours: inputs[0].textContent ?? '',
		minutes: inputs[1].textContent ?? '',
	};
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
});
