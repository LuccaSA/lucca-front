import { Component } from '@angular/core';
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'basic-mod-select',
	templateUrl: './basic.html',
})
export class BasicModSelectComponent {
	options = [
		{ id: 1, name: 'red' },
		{ id: 2, name: 'green' },
		{ id: 3, name: 'yellow' },
		{ id: 4, name: 'blue' },
	];
	mods = [
		{ id: 1, mod: 'mod-basic', name: 'Basic' },
		{ id: 2, mod: 'mod-compact', name: 'Compact' },
		{ id: 3, mod: 'mod-material', name: 'Material' },
		{ id: 4, mod: 'mod-framed', name: 'Framed' },
	];
	itemSelect = {id: 1, name: 'red'};
	modSelect = { id: 1, mod: 'mod-basic', name: 'Basic' };
}
