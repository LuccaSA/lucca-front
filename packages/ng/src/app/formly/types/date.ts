import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatDatepicker } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

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
		Observable.of({}).delay(1) // need timeout here because shenanigans
		.subscribe(() => {
			this.input.nativeElement.focus();
		});
	}
	focus(picker: MatDatepicker<any>) {
		this.to._isFocused = true;
		this.openPicker(picker);
	}
	blur() {
		this.to._isFocused = false;
	}
}
