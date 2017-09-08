import {Component, forwardRef, Input} from '@angular/core';
import {MdDialog} from '@angular/material';
import {CustomRangePickerComponent} from './custom-range-picker/custom-range-picker.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {LuTranslateService} from '../shared/translation.service';
import {translations} from './translate/date-range-picker.translate';
import {DateRange, DateRangeSelectChoice} from './date-range-picker.models';

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
			multi: true,
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

	customChoice: DateRangeSelectChoice;

	_selectedChoice: DateRangeSelectChoice;

	propagateChange = (_: any) => {};


	constructor(public dialog: MdDialog, public translateService: LuTranslateService) {
		this.preConfiguredRanges = [];
		this.customChoice = {label: null, range: { start: null, end: null}};
		translateService.setTranslations(translations);
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void { }

	writeValue(range: DateRange): void {
		if (!this.isEmptyRange(range)) {
			this.selectCustomRange(range);
		} else {
			this.selectedChoice = {label: '', range: { start: null, end: null}};
		}
	}

	set selectedChoice(choice: DateRangeSelectChoice) {
		this._selectedChoice = choice;
		this.propagateChange(choice.range);
	}

	get selectedChoice() {
		return this._selectedChoice;
	}

	onChoiceChange(choice: DateRangeSelectChoice) {
		if (!this.isEmptyRange(choice.range)) {
			this.selectedChoice = choice;
		}
	}

	pickCustomRange() {
		const dialog = this.dialog.open(CustomRangePickerComponent, {data: this.selectedChoice.range});
		dialog.afterClosed().subscribe(range => {
			if (range) {
				this.selectCustomRange({start: range.min, end: range.max});
			}
		});
	}

	selectCustomRange(range: DateRange) {
		this.customChoice.range = range;
		this.selectedChoice = this.customChoice;
	}

	isEmptyRange(range: DateRange) {
		return !range || (!range.start && !range.end);
	}

}
