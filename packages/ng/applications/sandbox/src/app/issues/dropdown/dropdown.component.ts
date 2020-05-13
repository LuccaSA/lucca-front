import { Component } from '@angular/core';

@Component({
	selector: 'sand-dropdown',
	templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
	public isToggleOpen: boolean;
	public toggle() {
		this.isToggleOpen = !this.isToggleOpen;
	}
}
