import { CdkDrag, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
	selector: 'app-edge-cases',
	imports: [CdkDropList, CdkDrag],
	template: `
		<ul cdkDropList (cdkDropListDropped)="reorder($event, 'first')">
			<li cdkDrag luReorderItemLabel="First">First</li><li cdkDrag>Second</li>
		</ul>
		<ul cdkDropList (cdkDropListDropped)="save()">
			<li cdkDrag luReorderItemLabel="Third">Third</li>
		</ul>
	`,
})
export class EdgeCasesComponent {
	reorder = (event: CdkDragDrop<string[]>, list: string): void => {
		console.log(list, event.currentIndex);
	};

	save(): void {
		// Persists the order
	}
}
