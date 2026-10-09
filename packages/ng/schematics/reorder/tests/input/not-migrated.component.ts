import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface Task {
	title: string;
}

@Component({
	selector: 'app-not-migrated',
	imports: [CdkDropList, CdkDrag],
	template: `
		<ul cdkDropList (cdkDropListDropped)="drop($event)">
			@for (task of tasks; track task.title) {
				<li cdkDrag [cdkDragData]="task">{{ task.title }}</li>
			}
		</ul>
		<ul cdkDropList (cdkDropListDropped)="drop($event); save()">
			@for (task of tasks; track task.title) {
				<li cdkDrag>{{ task.title }}</li>
			}
		</ul>
		<ul cdkDropList (cdkDropListDropped)="store.move($event)">
			@for (task of tasks; track task.title) {
				<li cdkDrag>{{ task.title }}</li>
			}
		</ul>
	`,
})
export class NotMigratedComponent {
	tasks: Task[] = [];

	store = { move: (event: CdkDragDrop<Task[]>) => event };

	drop(event: CdkDragDrop<Task[]>): void {
		console.log(event.item.data.title);
		moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
	}

	save(): void {
		// Persists the order
	}
}
