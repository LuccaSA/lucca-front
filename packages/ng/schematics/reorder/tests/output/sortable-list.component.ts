import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
import { ReorderDirective, ReorderEvent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-sortable-list',
	imports: [SortableListComponent, SortableListItemComponent, CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective],
	template: `
		<lu-sortable-list cdkDropList luReorder (luReorder)="drop($event)">
			@for (item of items; track item) {
				<lu-sortable-list-item [label]="item" drag cdkDrag [luReorderItemLabel]="item" />
			}
		</lu-sortable-list>
	`,
})
export class SortableListExampleComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: ReorderEvent<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
