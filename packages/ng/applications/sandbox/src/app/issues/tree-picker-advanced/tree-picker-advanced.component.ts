import { Component } from '@angular/core';

const node1 = { id: 1, name: 'root 1' };
const node11 = { id: 11, name: 'node 1.1' };
const node111 = { id: 111, name: 'leaf 1.1.1' };
const node12 = { id: 11, name: 'node 1.2' };
const node2 = { id: 2, name: 'root 2' };
const node21 = { id: 21, name: 'node 2.1' };

@Component({
	selector: 'lu-tree-picker-advanced',
	templateUrl: './tree-picker-advanced.component.html'
})
export class TreePickerAdvancedComponent {
	options = [{
		value: node1,
		children: [
			{ value: node11, children: [ { value: node111 } ] },
			{ value: node12, children: [] },
		]
	}, {
		value: node2,
		children: [ { value: node21 }]
	}];
	item;
	collection = [];

	searchFn(o, c) {
		return o.name.startsWith(c);
	}
}
