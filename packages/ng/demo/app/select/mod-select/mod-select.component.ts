import { Component } from '@angular/core';
@Component({
	selector: 'demo-mod-select',
	templateUrl: './mod-select.component.html',
})
export class DemoModSelectComponent {
	options = [
		{ id: 1, name: 'red' },
		{ id: 2, name: 'green' },
		{ id: 3, name: 'yellow' },
		{ id: 4, name: 'blue' },
	];
	mods = [
		{ id: 1, mod: 'mod-material', name: 'Material' },
		{ id: 2, mod: 'mod-compact', name: 'Compact' },
		{ id: 3, mod: 'mod-framed', name: 'Framed' },
		{ id: 4, mod: 'mod-basic', name: 'Basic' },
	];
	itemSelect = {id: 1, name: 'red'};
	modSelect = { id: 1, mod: 'mod-material', name: 'Material' };
}
