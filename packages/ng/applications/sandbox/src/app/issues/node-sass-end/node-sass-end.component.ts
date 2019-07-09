import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material';

@Component({
	selector: 'lu-node-sass-end',
	templateUrl: './node-sass-end.component.html'
})
export class NodeSassEndComponent {

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

	private refocusInput() {
		setTimeout(() => { // need timeout here because shenanigans
			this.input.nativeElement.focus();
		}, 1);
	}
}
