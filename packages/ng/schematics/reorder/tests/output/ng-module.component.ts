import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ReorderEvent } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-ng-module',
	standalone: false,
	template: `
		<ul cdkDropList luReorder (luReorder)="drop($event)">
			@for (item of items; track item) {
				<li cdkDrag [luReorderItemLabel]="item">{{ item }}</li>
			}
		</ul>
	`,
})
export class NgModuleComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: ReorderEvent<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
