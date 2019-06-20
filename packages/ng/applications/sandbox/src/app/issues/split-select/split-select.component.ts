import { Component } from '@angular/core';

@Component({
	selector: 'lu-split-select',
	templateUrl: './split-select.component.html'
})
export class SplitSelectComponent {
	item = { id: 1, name: 'initial value' };
	option = { id: 2, name: 'option' };
}
