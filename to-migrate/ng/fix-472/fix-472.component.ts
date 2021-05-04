import { Component } from '@angular/core';

@Component({
	selector: 'lu-fix-472',
	templateUrl: './fix-472.component.html'
})
export class Fix472Component {
	items = [];
	options = [
		{ value: 0, name: 'zero' },
		{ value: 1, name: 'one' },
		{ value: 2, name: 'two' },
		{ value: 3, name: 'three' },
	];
}
