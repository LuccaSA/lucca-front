import { Component } from '@angular/core';

const node1 = { id: 1, name: 'root 1' };
const node11 = { id: 11, name: 'node 1.1' };
const node111 = { id: 111, name: 'leaf 1.1.1' };
const node12 = { id: 11, name: 'node 1.2' };
@Component({
	selector: 'lu-poc-tree',
	templateUrl: './poc-tree.component.html'
})
export class PocTreeComponent {
	tree = {
		value: node1,
		children: [
			{ value: node11, children: [ { value: node111 } ] },
			{ value: node12, children: [] },
		]
	};
	item;
	collection = [];

}
