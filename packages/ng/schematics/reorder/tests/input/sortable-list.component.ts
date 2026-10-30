import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';

@Component({
	selector: 'app-sortable-list',
	imports: [SortableListComponent, SortableListItemComponent, CdkDropList, CdkDrag],
	template: `
		<lu-sortable-list cdkDropList (cdkDropListDropped)="drop($event)">
			@for (item of items; track item) {
				<lu-sortable-list-item [label]="item" drag cdkDrag [luReorderItemLabel]="item" />
			}
		</lu-sortable-list>
	`,
})
export class SortableListExampleComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
