import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostBinding, Input, OnChanges, Output } from '@angular/core';
import { FormsModule, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';

import { isNotNull, isNull, LU_DURATION_PICKER_TRANSLATIONS, parseDuration } from '../../tools';
import { isDayDurationPickerStep, LuDurationPickerStep } from '../duration-picker-step';
import { LuNumberOnlyDirective } from '../numbers-only.directive';
import { RoundPipe } from './round.pipe';

@Component({
	selector: 'lu-day-duration-picker',
	templateUrl: './day-duration-picker.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, FormsModule, RoundPipe, LuNumberOnlyDirective],
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => LuDayDurationPickerComponent),
			multi: true,
		},
	],
})
export class LuDayDurationPickerComponent implements OnChanges, Validator {
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

	private iso8601DurationRegex = /(-)?P(?:([.,\d]+)D)?(?:T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?)?/;

	public days = 0;

	private _stepDays = 0;
	private _minDays = 0;
	private _maxDays: number | null = null;

	public ngOnChanges() {
		this.value = this.value ?? 'P0D';
		this.days = this.daysFromDuration(this.value);

		this.step = this.step ?? 'PT3H';
		if (!isDayDurationPickerStep(this.step)) {
			this.isValid = false;
			throw Error('Invalid step');
		}
		this._stepDays = this.daysFromDuration(this.step);

		if (isNotNull(this.min)) {
			this._minDays = this.daysFromDuration(this.min);
		}
		if (isNotNull(this.max)) {
			this._maxDays = this.daysFromDuration(this.max);
		}
	}

	private daysFromDuration(isoString: string): number {
		const parsedValue = parseDuration(isoString);
		let days = parsedValue.days;
		days += parsedValue.hours / 24;
		days += parsedValue.minutes / 24 / 60;
		days += parsedValue.seconds / 24 / 60 / 60;
		return days;
	}

	public updateDays(newValue: number): void {
		this.days = newValue;
		this.emitChange();
	}

	public emitChange(): void {
		this.valueChange.emit(this.iso8601Duration);
		this.touched.emit();
	}

	public get iso8601Duration(): string {
		const dayInHours = this.days * 24;
		const days = Math.trunc(dayInHours / 24);
		const hoursInMinutes = (dayInHours % 24) * 60;
		const hours = Math.trunc(hoursInMinutes / 60);
		const minutesInSeconds = (hoursInMinutes % 60) * 60;
		const minutes = Math.trunc(minutesInSeconds / 60);
		const seconds = Math.trunc(minutesInSeconds % 60);
		return `P${days}DT${hours}H${minutes}M${seconds}S`;
	}

	public get calculatedStepDays(): number {
		return Math.max(0.125, this._stepDays ?? 0.125);
	}

	public get canIncrementDays(): boolean {
		return isNull(this._maxDays) || this.days <= this._maxDays - this.calculatedStepDays;
	}

	public get canDecrementDays(): boolean {
		return this.days >= this._minDays + this.calculatedStepDays;
	}

	public incrementDays(): void {
		if (!this.canIncrementDays) {
			return;
		}
		const dayNotOnValidStep = this.days > 0 && this.days % this.calculatedStepDays !== 0;
		if (dayNotOnValidStep) {
			const remainder = this.calculatedStepDays - (this.days % this.calculatedStepDays);
			this.updateDays(remainder + this.days);
		} else {
			this.updateDays(this.days + this.calculatedStepDays);
		}
	}

	public decrementDays(): void {
		if (!this.canDecrementDays) {
			return;
		}
		const dayNotOnValidStep = this.days % this.calculatedStepDays !== 0;
		if (dayNotOnValidStep) {
			const remainder = this.days % this.calculatedStepDays;
			this.updateDays(this.days - remainder);
		} else {
			this.updateDays(this.days - this.calculatedStepDays);
		}
	}

	public validate(): ValidationErrors | null {
		if (isNotNull(this._minDays) && this.days < this._minDays) {
			return { min: true };
		} else if (isNotNull(this._maxDays) && this.days > this._maxDays) {
			return { max: true };
		} else {
			return null;
		}
	}
}
