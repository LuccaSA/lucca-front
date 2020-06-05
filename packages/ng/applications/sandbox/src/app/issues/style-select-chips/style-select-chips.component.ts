import { Component } from '@angular/core';

@Component({
	selector: 'sand-style-select-chips',
	templateUrl: './style-select-chips.component.html'
})
export class StyleSelectChipsComponent {
	item;
	model = '1';
	red = { id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	yellow = { id: 3, name: 'yellow' };
	orange = { id: 4, name: 'orange' };
	purple = { id: 5, name: 'purple' };
	pink = { id: 6, name: 'pink' };
	blue = { id: 7, name: 'blue' };
	items = [this.red, this.blue];
}
