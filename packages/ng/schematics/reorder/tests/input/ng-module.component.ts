import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
	selector: 'app-ng-module',
	standalone: false,
	template: `
		<ul cdkDropList (cdkDropListDropped)="drop($event)">
			@for (item of items; track item) {
				<li cdkDrag [luReorderItemLabel]="item">{{ item }}</li>
			}
		</ul>
	`,
})
export class NgModuleComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
