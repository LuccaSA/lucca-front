import { Component } from '@angular/core';

@Component({
	selector: 'lu-poc-tree',
	templateUrl: './poc-tree.component.html'
})
export class PocTreeComponent {
	node1 = { id: 1, name: 'root' };
	node11 = { id: 11, name: 'node' };
	node111 = { id: 111, name: 'leaf' };

}
