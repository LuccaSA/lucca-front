import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatDatepicker } from '@angular/material';

@Component({
	selector: 'lu-formly-field-date',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './date.html',
})
export class LuFormlyFieldDate extends FieldType {
	@ViewChild('input', { read: ElementRef, static: true }) input: ElementRef;

	openPicker(picker: MatDatepicker<any>) {
		if (!picker.opened) {
			picker.open();
			this.refocusInput();
		}
	}
	closePicker(picker: MatDatepicker<any>) {
		if (picker.opened) {
			picker.close();
		}
	}
	togglePicker(picker: MatDatepicker<any>) {
		if (!picker.opened) {
			picker.open();
			this.refocusInput();
		} else {
			picker.close();
		}
	}
	onTab(picker: MatDatepicker<any>) {
		picker.close();
	}
	onEnter(picker: MatDatepicker<any>) {
		picker.close();
	}
	onEscape(picker: MatDatepicker<any>) {
		picker.close();
	}
	private refocusInput() {
		setTimeout(() => { // need timeout here because shenanigans
			this.input.nativeElement.focus();
		}, 1);
	}
	focus(picker: MatDatepicker<any>) {
		this.to._isFocused = true;
		this.openPicker(picker);
	}
	blur() {
		this.to._isFocused = false;
	}
}
