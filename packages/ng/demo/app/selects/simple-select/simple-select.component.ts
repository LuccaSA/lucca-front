import { Component } from '@angular/core';
@Component({
	selector: 'demo-simple-select',
	templateUrl: './simple-select.component.html',
})
export class DemoSimpleSelectComponent {
	options = [
			{ id: 1, name: 'red' },
			{ id: 2, name: 'green' },
			{ id: 3, name: 'yellow' },
			{ id: 4, name: 'blue' },
		];
	itemSelect = {id: 1, name: 'red'};
}
