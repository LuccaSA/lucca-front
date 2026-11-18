import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ResourceCardComponent } from '@lucca-front/ng/resource-card';

interface Task {
	title: string;
}

@Component({
	selector: 'app-kanban',
	imports: [CdkDropListGroup, CdkDropList, CdkDrag, ResourceCardComponent],
	template: `
		<div cdkDropListGroup>
			<div cdkDropList [cdkDropListData]="todo" (cdkDropListDropped)="drop($event)">
				@for (task of todo; track task.title) {
					<lu-resource-card cdkDrag [cdkDragData]="task">{{ task.title }}</lu-resource-card>
				}
			</div>
			<div cdkDropList [cdkDropListData]="done" (cdkDropListDropped)="drop($event)">
				@for (task of done; track task.title) {
					<lu-resource-card cdkDrag [cdkDragData]="task">{{ task.title }}</lu-resource-card>
				}
			</div>
		</div>
	`,
})
export class KanbanComponent {
	todo: Task[] = [];

	done: Task[] = [];

	drop(event: CdkDragDrop<Task[]>): void {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		}
	}
}
