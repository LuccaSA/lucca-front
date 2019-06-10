import { Component } from '@angular/core';

@Component({
	selector: 'lu-tree-picker-advanced',
	templateUrl: './tree-picker-advanced.component.html'
})
export class TreePickerAdvancedComponent {
	node1 = { id: 1, name: 'root 1' };
	node11 = { id: 11, name: 'node 1.1' };
	node111 = { id: 111, name: 'leaf 1.1.1' };
	node12 = { id: 11, name: 'node 1.2' };

	collection = [];
}
