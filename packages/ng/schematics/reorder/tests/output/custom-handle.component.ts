import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ReorderDirective, ReorderEvent, ReorderHandleComponent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-custom-handle',
	imports: [CdkDropList, CdkDrag, IconComponent, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent],
	template: `
		<ul cdkDropList luReorder (luReorder)="drop($event)">
			@for (item of items; track item) {
				<li class="taskList-item" cdkDrag [luReorderItemLabel]="item">
					<lu-reorder-handle class="taskList-item-handle" />
					{{ item }}
				</li>
			}
		</ul>
	`,
})
export class CustomHandleComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: ReorderEvent<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
