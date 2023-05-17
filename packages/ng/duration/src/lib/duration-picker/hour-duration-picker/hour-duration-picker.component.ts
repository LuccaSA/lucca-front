import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostBinding, Input, OnChanges, Output } from '@angular/core';
import { FormsModule, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';

import { isNotNull, isNull, LU_DURATION_PICKER_TRANSLATIONS, parseDuration } from '../../tools';
import { isHourDurationPickerStep, LuDurationPickerStep } from '../duration-picker-step';
import { LuNumberOnlyDirective } from '../numbers-only.directive';

@Component({
	selector: 'lu-hour-duration-picker',
	templateUrl: './hour-duration-picker.component.html',
	styleUrls: ['./hour-duration-picker.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, FormsModule, LuNumberOnlyDirective],
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuHourDurationPickerComponent),
			multi: true,
		},
	],
})
export class LuHourDurationPickerComponent implements OnChanges, Validator {
	@HostBinding('class.timePicker-fieldset') public timePickerClass = true;
	@Input() public value!: string;

	@Input() public step!: LuDurationPickerStep;

	@Input() public min?: string;

	@Input() public max?: string;

	@Input() public autocorrect?: string[];

	@Input() public hideButtons = false;

	@Input()
	@HostBinding('class.is-disabled')
	public disabled = false;

	@Output() public valueChange = new EventEmitter<string>();

	@Output() public touched = new EventEmitter<void>();

	public intl = getIntl(LU_DURATION_PICKER_TRANSLATIONS);

	public isValid = true;

	public hours = 0;
	public minutes = 0;

	private _stepHours = 0;
	private _stepMinutes = 0;
	private _minHours = 0;
	private _minMinutes = 0;
	private _maxHours: number | null = null;
	private _maxMinutes: number | null = null;

	public ngOnChanges() {
		this.value = this.value ?? 'PT0H';
		const parsedValue = parseDuration(this.value);
		this.hours = parsedValue.days * 24 + parsedValue.hours;
		this.minutes = parsedValue.minutes;

		this.step = this.step ?? 'PT1M';
		if (!isHourDurationPickerStep(this.step)) {
			this.isValid = false;
			throw Error('Invalid step');
		}
		const parsedStep = parseDuration(this.step);
		this._stepHours = parsedStep.days * 24 + parsedStep.hours;
		this._stepMinutes = parsedStep.minutes;

		if (isNotNull(this.min)) {
			const parsedMin = parseDuration(this.min);
			this._minHours = parsedMin.days * 24 + parsedMin.hours;
			this._minMinutes = parsedMin.minutes;
		}
		if (isNotNull(this.max)) {
			const parsedMax = parseDuration(this.max);
			this._maxHours = parsedMax.days * 24 + parsedMax.hours;
			this._maxMinutes = parsedMax.minutes;
		}
	}

	public hoursValueChange(value: string): void {
		const hours = parseInt(value);
		this.updateHours(isNaN(hours) ? 0 : hours);
	}

	public minutesValueChange(value: string): void {
		const minutes = parseInt(value);
		this.updateMinutes(isNaN(minutes) ? 0 : minutes);
	}

	private updateHours(newValue: number): void {
		this.hours = newValue;

		// Autocorrect only
		// if (this.calculatedStepMinutes === 0 && this._stepMinutes !== 0) {
		//   this.updateMinutes(this.getStepMinutesFromHours());
		// }

		this.emitChange();
	}

	private updateMinutes(newValue: number): void {
		let carry = 0;
		if (newValue > 59) {
			carry = Math.floor(newValue / 60);
			newValue = newValue % 60;
		} else if (newValue < 0) {
			this.updateHours(this.hours - 1);
			newValue += 60;
		}
		this.minutes = newValue;
		if (carry > 0) {
			this.hours += carry;
		}
		this.emitChange();
	}

	// Works for any step where `hours <= 1` and `minutes == 0 || 60 % minutes == 0`
	private getStepMinutesFromHours(): number {
		if (this._stepHours === 0 && this._stepMinutes === 0) {
			return 0;
		}
		const stepInMinutes = this._stepHours * 60 + this._stepMinutes;
		const hoursInMinutes = this.hours * 60;
		if (hoursInMinutes % stepInMinutes === 0) {
			return 0;
		}
		const totalStepMinutes = this._stepMinutes * (Math.floor(hoursInMinutes / stepInMinutes) + this._stepHours);
		return totalStepMinutes % 60 === 0 ? 60 : totalStepMinutes % 60;
	}

	private emitChange(): void {
		this.valueChange.emit(this.iso8601Duration);
		this.touched.emit();
	}

	public get iso8601Duration(): string {
		return `PT${this.hours}H${this.minutes}M`;
	}

	public get calculatedStepHours(): number {
		return Math.max(1, this._stepHours ?? 1);
	}

	public get calculatedStepMinutes(): number {
		return this._stepHours > 0 ? 0 : Math.max(1, this._stepMinutes);
	}

	public get calculatedMinHours(): number | null {
		return this._minHours;
	}

	public get calculatedMinMinutes(): number | null {
		if (this._minHours === this.hours) {
			return this._minMinutes;
		}
		return null;
	}

	public get calculatedMaxHours(): number | null {
		return this._maxHours;
	}

	public get calculatedMaxMinutes(): number | null {
		if (this._maxHours === this.hours) {
			return this._maxMinutes;
		}
		return null;
	}

	public get canIncrementHours(): boolean {
		return (
			isNull(this._maxHours) ||
			this.hours < this._maxHours - this.calculatedStepHours ||
			(isNotNull(this._maxMinutes) && this.hours === this._maxHours - this.calculatedStepHours && this.minutes <= this._maxMinutes)
		);
	}

	public get canDecrementHours(): boolean {
		return this.hours > this._minHours + this.calculatedStepHours || (this.hours === this._minHours + this.calculatedStepHours && this.minutes >= this._minMinutes);
	}

	public incrementHours(): void {
		if (!this.canIncrementHours) {
			return;
		}
		const hourNotOnValidStep = this.calculatedStepHours && this.hours > 0 && this.hours % this.calculatedStepHours !== 0;
		if (hourNotOnValidStep) {
			const remainder = this.calculatedStepHours - (this.hours % this.calculatedStepHours);
			this.updateHours(remainder + this.hours);
		} else {
			this.updateHours(this.hours + this.calculatedStepHours);
		}
	}

	public decrementHours(): void {
		if (!this.canDecrementHours) {
			return;
		}
		const hourNotOnValidStep = this.calculatedStepHours && this.hours % this.calculatedStepHours !== 0;
		if (hourNotOnValidStep) {
			const remainder = this.hours % this.calculatedStepHours;
			this.updateHours(this.hours - remainder);
		} else {
			this.updateHours(this.hours - this.calculatedStepHours);
		}
	}

	public get canIncrementMinutes(): boolean {
		return isNull(this._maxMinutes) || this.minutes <= this._maxMinutes - this.calculatedStepMinutes || this.hours !== this._maxHours;
	}

	public get canDecrementMinutes(): boolean {
		return this.minutes >= this._minMinutes + this.calculatedStepMinutes || this.hours !== this._minHours;
	}

	public incrementMinutes(): void {
		if (!this.canIncrementMinutes) {
			return;
		}
		const minuteNotOnValidStep = this.calculatedStepMinutes && this.minutes % this.calculatedStepMinutes !== 0;
		if (minuteNotOnValidStep) {
			this.updateMinutes(this.calculatedStepMinutes - (this.minutes % this.calculatedStepMinutes) + this.minutes);
		} else {
			this.updateMinutes(this.minutes + this.calculatedStepMinutes);
		}
	}

	public decrementMinutes(): void {
		if ((this.minutes === 0 && this.hours === 0) || (this.minutes === this._minMinutes && this.hours === this._minHours)) {
			return;
		}
		const minuteNotOnValidStep = this.calculatedStepMinutes && this.minutes % this.calculatedStepMinutes !== 0;
		if (minuteNotOnValidStep) {
			this.updateMinutes(this.minutes - (this.minutes % this.calculatedStepMinutes));
		} else {
			this.updateMinutes(this.minutes - this.calculatedStepMinutes);
		}
	}

	public validate(): ValidationErrors | null {
		if ((isNotNull(this._minHours) && this.hours < this._minHours) || (isNotNull(this._minMinutes) && this.hours === this._minHours && this.minutes < this._minMinutes)) {
			return { min: true };
		} else if ((isNotNull(this._maxHours) && this.hours > this._maxHours) || (isNotNull(this._maxMinutes) && this.hours === this._maxHours && this.minutes > this._maxMinutes)) {
			return { max: true };
		} else {
			return null;
		}
	}
}
