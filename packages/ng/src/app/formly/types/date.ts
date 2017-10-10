import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from 'ng-formly';
import { MatDatepicker } from '@angular/material';
@Component({
	selector: 'lu-formly-field-date',
	styleUrls: ['formly-field.common.scss'],
	templateUrl: './date.html',
})
export class LuFormlyFieldDate extends FieldType {
	@ViewChild('input') input: ElementRef;

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
	private refocusInput() {
		setTimeout(() => { // need timeout here because shenanigans
			this.input.nativeElement.focus();
		}, 0);
	}
}
