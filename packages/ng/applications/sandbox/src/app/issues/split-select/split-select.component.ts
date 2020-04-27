import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'lu-split-select',
	templateUrl: './split-select.component.html'
})
export class SplitSelectComponent {
	item = { id: 1, name: 'initial value' };
	option = { id: 2, name: 'option' };
	formControl = new FormControl();
}
