import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ResourceCardComponent } from '@lucca-front/ng/resource-card';
import { ReorderDirective, ReorderEvent } from '@lucca-front/ng/reorder';

interface Task {
	title: string;
}

@Component({
	selector: 'app-kanban',
	imports: [CdkDropListGroup, CdkDropList, CdkDrag, ResourceCardComponent, ReorderDirective],
	template: `
		<div cdkDropListGroup>
			<div cdkDropList luReorder [cdkDropListData]="todo" (luReorder)="drop($event)">
				@for (task of todo; track task.title) {
					<!-- TODO: add luReorderItemLabel -->
					<lu-resource-card cdkDrag [cdkDragData]="task">{{ task.title }}</lu-resource-card>
				}
			</div>
			<div cdkDropList luReorder [cdkDropListData]="done" (luReorder)="drop($event)">
				@for (task of done; track task.title) {
					<!-- TODO: add luReorderItemLabel -->
					<lu-resource-card cdkDrag [cdkDragData]="task">{{ task.title }}</lu-resource-card>
				}
			</div>
		</div>
	`,
})
export class KanbanComponent {
	todo: Task[] = [];

	done: Task[] = [];

	drop(event: ReorderEvent<Task[]>): void {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
	}
}
