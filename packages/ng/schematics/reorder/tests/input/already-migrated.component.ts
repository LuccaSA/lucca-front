import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ReorderDirective, ReorderEvent } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-already-migrated',
	imports: [CdkDropList, CdkDrag, ReorderDirective],
	template: `
		<ul cdkDropList luReorder (luReorder)="drop($event)">
			@for (item of items; track item) {
				<li cdkDrag>{{ item }}</li>
			}
		</ul>
	`,
})
export class AlreadyMigratedComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: ReorderEvent<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
