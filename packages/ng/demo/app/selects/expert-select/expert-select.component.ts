import { Component } from '@angular/core';
@Component({
	selector: 'demo-expert-select',
	templateUrl: './expert-select.component.html',
	styleUrls: ['./expert-select.component.scss'],
})
export class DemoExpertSelectComponent {
	options = [
			{ id: 1, name: 'red' },
			{ id: 2, name: 'green' },
			{ id: 3, name: 'yellow' },
			{ id: 4, name: 'blue' },
		];
	itemOptions = {id: 1, name: 'red'};

	_canRemove = false;

	canRemove(canRemove: boolean) {
		this._canRemove = canRemove;
	}

	clear() {
		this.itemOptions = null;
	}
}

