import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { LuDayDurationPickerComponent } from './day-duration-picker/day-duration-picker.component';
import { LuDurationPickerStep } from './duration-picker-step';
import { LuDurationUnit } from './duration-unit.model';
import { LuHourDurationPickerComponent } from './hour-duration-picker/hour-duration-picker.component';

@Component({
	selector: 'lu-duration-picker',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, LuHourDurationPickerComponent, LuDayDurationPickerComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDurationPickerComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuDurationPickerComponent),
			multi: true,
		},
	],
	template: `
		<lu-hour-duration-picker
			*ngIf="unit === 'hour'; else dayDurationPicker"
			[value]="value"
			(valueChange)="updateValue($event)"
			(touched)="onTouched?.()"
			[step]="step"
			[min]="min"
			[max]="max"
			[autocorrect]="autocorrect"
			[hideButtons]="hideButtons"
			[disabled]="disabled"
		></lu-hour-duration-picker>
		<ng-template #dayDurationPicker>
			<lu-day-duration-picker
				[value]="value"
				(valueChange)="updateValue($event)"
				(touched)="onTouched?.()"
				[step]="step"
				[min]="min"
				[max]="max"
				[autocorrect]="autocorrect"
				[hideButtons]="hideButtons"
				[disabled]="disabled"
			></lu-day-duration-picker>
		</ng-template>
	`,
})
export class LuDurationPickerComponent implements ControlValueAccessor, Validator {
	@HostBinding('class.timePicker') public timePickerClass = true;

	public value!: string;

	@Input() public unit!: LuDurationUnit;

	@Input() public step!: LuDurationPickerStep;

	@Input() public min?: string;

	@Input() public max?: string;

	@Input() public autocorrect?: string[];

	@Input() public hideButtons = false;

	@HostBinding('class.is-disabled')
	public disabled = false;

	@ViewChild(NG_VALIDATORS)
	public childValidator?: Validator;

	protected onChange?: (value: string) => void;
	protected onTouched?: () => void;

	public registerOnChange(onChange: (value: string) => void): void {
		this.onChange = onChange;
	}

	public registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public updateValue(value: string): void {
		this.value = value;
		this.onChange?.(value);
	}

	public writeValue(value: string): void {
		this.value = value;
	}

	public validate(control: AbstractControl): ValidationErrors | null {
		return this.childValidator?.validate(control) ?? null;
	}
}
