import { Component } from '@angular/core';

@Component({
	selector: 'sand-option-comparer',
	templateUrl: './option-comparer.component.html'
})
export class OptionComparerComponent {
	empty = undefined;
	user = { id: 8, lastName: 'Not', firstName: 'my real name' };
	users = [this.user];
	department = { id: 13, name: 'placeholder name' };
	departments = [this.department];
	item = { id: 27, name: 'placeholder name' };
	items = [this.item];
}
