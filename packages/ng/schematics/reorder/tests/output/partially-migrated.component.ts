import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ReorderDirective } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-partially-migrated',
	imports: [CdkDropList, CdkDrag, ReorderDirective],
	template: `
		<ul cdkDropList luReorder (cdkDropListDropped)="drop($event)">
			@for (item of items; track item) {
				<li cdkDrag [luReorderItemLabel]="item">{{ item }}</li>
			}
		</ul>
	`,
})
export class PartiallyMigratedComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
