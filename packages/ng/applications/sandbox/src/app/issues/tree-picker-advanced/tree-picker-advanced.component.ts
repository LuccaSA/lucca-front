import { Component } from '@angular/core';
import { ILuTree } from '@lucca-front/ng';

@Component({
	selector: 'lu-tree-picker-advanced',
	templateUrl: './tree-picker-advanced.component.html'
})
export class TreePickerAdvancedComponent {
	node1 = { id: 1, name: 'root 1' };
	node11 = { id: 11, name: 'node 1.1' };
	node111 = { id: 111, name: 'leaf 1.1.1' };
	node12 = { id: 11, name: 'node 1.2' };
	node2 = { id: 11, name: 'root 2' };

	collection = [];

	options: ILuTree[] = [
		{ node: this.node1, children: [
			{ node: this.node11, children: [
				{node: this.node111, children: [] }
			]},
			{ node: this.node12, children: [] },
		]},
		{ node: this.node2, children: [] },
	];
}
