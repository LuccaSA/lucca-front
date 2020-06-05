import { Component } from '@angular/core';

@Component({
	selector: 'sand-dropdown',
	templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
	debug(num) {
		console.log(`button ${num} activated`)
	}
}
