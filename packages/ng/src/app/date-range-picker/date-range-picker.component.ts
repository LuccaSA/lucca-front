import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';

/**
 * Pick date ranges from a customizable list displayed inside an Angular Material MdSelect.
 */
@Component({
	selector: 'lu-date-range-picker',
	templateUrl: './date-range-picker.component.html',
	styleUrls: ['./date-range-picker.component.scss']
})
export class LuDateRangePickerComponent {

	/**
	 * Placeholder string of the MDSelect
	 */
	@Input() placeholder: string;

	/**
	 * Emits last select value for min date of the range.
	 * Used by dateMin two-way binding, typically you should not have to use it directly.
	 * @type {EventEmitter<Moment>}
	 */
	@Output() dateMinChange = new EventEmitter<moment.Moment>();
	_dateMin: moment.Moment;

	/**
	 * Emits last select value for max date of the range.
	 * Used by dateMax two-way binding, typically you should not have to use it directly.
	 * @type {EventEmitter<Moment>}
	 */
	@Output() dateMaxChange = new EventEmitter<moment.Moment>();
	_dateMax: moment.Moment;

	/**
	 * Array of choices the user will select from.
	 * Import class DateRangeSelectChoice in order to build choices.
	 */
	@Input() preConfiguredRanges: DateRangeSelectChoice[];


	constructor() { }

	/**
	 * Min date of selected ranged. Allows two-way binding.
	 * @returns {Moment}
	 */
	@Input()
	get dateMin(): moment.Moment {
		return this._dateMin;
	}

	set dateMin(newDateMin: moment.Moment) {
		this._dateMin = newDateMin;
		this.dateMinChange.emit(this._dateMin);
	}

	/**
	 * Max date of selected ranged. Allows two-way binding.
	 * @returns {Moment}
	 */
	@Input()
	get dateMax(): moment.Moment {
		return this._dateMax;
	}

	set dateMax(newDateMax: moment.Moment) {
		this._dateMax = newDateMax;
		this.dateMaxChange.emit(this._dateMax);
	}

	onChoiceChange(choice: DateRangeSelectChoice) {
		this.dateMin = choice.dateMin;
		this.dateMax = choice.dateMax;
	}

}

export class DateRangeSelectChoice {
	dateMin: moment.Moment;
	dateMax: moment.Moment;
	label: string;
}
