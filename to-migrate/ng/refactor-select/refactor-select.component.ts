import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'lu-refactor-select',
	templateUrl: './refactor-select.component.html'
})
export class RefactorSelectComponent {
	item = '1';
	collection = ['1'];
	model = '1';
	ctrl = new FormControl();
	showSelect = true;
	toggle() {
		this.showSelect = !this.showSelect
	}
}
