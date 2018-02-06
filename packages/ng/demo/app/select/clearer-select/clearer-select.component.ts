import { Component } from '@angular/core';
@Component({
	selector: 'demo-clearer-select',
	templateUrl: './clearer-select.component.html',
})
export class DemoClearerSelectComponent {
	options = [
		{ id: 1, name: 'red' },
		{ id: 2, name: 'green' },
		{ id: 3, name: 'yellow' },
		{ id: 4, name: 'blue' },
	];
	itemSelect = {id: 1, name: 'red'};
	itemSelectDefault = {id: 1, name: 'red'};

}
