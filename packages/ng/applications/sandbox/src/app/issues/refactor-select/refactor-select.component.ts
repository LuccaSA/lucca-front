import { Component } from '@angular/core';

@Component({
	selector: 'lu-refactor-select',
	templateUrl: './refactor-select.component.html'
})
export class RefactorSelectComponent {
	model = '1';

	red = { id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	yellow = { id: 3, name: 'yellow' };
	blue = { id: 4, name: 'blue' };
	items = [this.red, this.blue];
}
