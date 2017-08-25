import {Component, forwardRef, Input} from '@angular/core';
import * as moment from 'moment';
import {MdDialog} from '@angular/material';
import {CustomRangePickerComponent} from './custom-range-picker/custom-range-picker.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * Pick date ranges from a customizable list displayed inside an Angular Material MdSelect.
 */
@Component({
	selector: 'lu-date-range-picker',
	templateUrl: './date-range-picker.component.html',
	styleUrls: ['./date-range-picker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => LuDateRangePickerComponent),
			multi: true
		}
	]
})
export class LuDateRangePickerComponent implements ControlValueAccessor {

	/**
	 * Placeholder string of the MDSelect
	 */
	@Input() placeholder: string;

	/**
	 * Array of choices the user will select from.
	 * Import class DateRangeSelectChoice in order to build choices.
	 */
	@Input() preConfiguredRanges: DateRangeSelectChoice[];

	customRange: DateRangeSelectChoice;

	_dateRange: DateRange;

	propagateChange = (_: any) => {};


	constructor(public dialog: MdDialog) { }

	writeValue(obj: DateRange): void {
		this._dateRange = obj;
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void { }

	onChoiceChange(choice: DateRangeSelectChoice) {
		if(!!choice){
			this._dateRange = choice.range;
			this.propagateChange(this._dateRange);
		}
	}

	selectCustomRange() {
		let dialog = this.dialog.open(CustomRangePickerComponent);
		dialog.afterClosed().subscribe(range => this.onChoiceChange({label: '', range: {dateMin: range.min, dateMax: range.max}}));
	}

}

export interface DateRangeSelectChoice {
	range: DateRange;
	label: string;
}

export interface DateRange {
	dateMin: moment.Moment;
	dateMax: moment.Moment;
}
