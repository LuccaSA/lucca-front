import { Component } from '@angular/core';

@Component({
	selector: 'lu-refactor-api-select',
	templateUrl: './refactor-api-select.component.html'
})
export class RefactorApiSelectComponent {
	model = { id: 1, name: 'initial value' };
	user = { id: 1, firstName: 'john', lastName: 'doe' };
}
