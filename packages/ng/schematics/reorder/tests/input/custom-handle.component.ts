import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'app-custom-handle',
	imports: [CdkDropList, CdkDrag, CdkDragHandle, IconComponent],
	template: `
		<ul cdkDropList (cdkDropListDropped)="drop($event)">
			@for (item of items; track item) {
				<li class="taskList-item" cdkDrag [luReorderItemLabel]="item">
					<span class="button mod-ghost mod-S taskList-item-handle" cdkDragHandle>
						<lu-icon icon="dotsDrag" />
					</span>
					{{ item }}
				</li>
			}
		</ul>
	`,
})
export class CustomHandleComponent {
	items = ['Carrot', 'Leek', 'Turnip'];

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.items, event.previousIndex, event.currentIndex);
	}
}
