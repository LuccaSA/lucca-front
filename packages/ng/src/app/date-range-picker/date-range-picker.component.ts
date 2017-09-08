import {Component, forwardRef, Input} from '@angular/core';
import {MdDialog} from '@angular/material';
import {DateRangeModalComponent} from './date-range-modal/date-range-modal.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {LuTranslateService} from '../shared/translation.service';
import {translations} from './translate/date-range-picker.translate';
import {IDateRange, IDateRangeSelectChoice} from './date-range-picker.model';

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
	 * Import class IDateRangeSelectChoice in order to build choices.
	 */
	@Input() preConfiguredRanges: IDateRangeSelectChoice[];

	customChoice: IDateRangeSelectChoice;

	_selectedChoice: IDateRangeSelectChoice;

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

	writeValue(range: IDateRange): void {
		if (!this.isEmptyRange(range)) {
			this.selectCustomRange(range);
		} else {
			this.selectedChoice = {label: '', range: { start: null, end: null}};
		}
	}

	set selectedChoice(choice: IDateRangeSelectChoice) {
		this._selectedChoice = choice;
		this.propagateChange(choice.range);
	}

	get selectedChoice() {
		return this._selectedChoice;
	}

	onChoiceChange(choice: IDateRangeSelectChoice) {
		if (!this.isEmptyRange(choice.range)) {
			this.selectedChoice = choice;
		}
	}

	pickCustomRange() {
		const dialog = this.dialog.open(DateRangeModalComponent, {data: this.selectedChoice.range});
		dialog.afterClosed().subscribe(range => {
			if (range) {
				this.selectCustomRange({start: range.start, end: range.end});
			}
		});
	}

	selectCustomRange(range: IDateRange) {
		this.customChoice.range = range;
		this.selectedChoice = this.customChoice;
	}

	isEmptyRange(range: IDateRange) {
		return !range || (!range.start && !range.end);
	}

}
