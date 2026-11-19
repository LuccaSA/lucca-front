import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ReorderDirective, ReorderEvent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-edge-cases',
	imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective],
	template: `
		<ul cdkDropList luReorder (luReorder)="reorder($event, 'first')">
			<!-- TODO: add <lu-reorder-handle /> -->
			<li cdkDrag luReorderItemLabel="First">First</li><!-- TODO: add luReorderItemLabel --> <!-- TODO: add <lu-reorder-handle /> --> <li cdkDrag>Second</li>
		</ul>
		<ul cdkDropList luReorder (luReorder)="save()">
			<!-- TODO: add <lu-reorder-handle /> -->
			<li cdkDrag luReorderItemLabel="Third">Third</li>
		</ul>
	`,
})
export class EdgeCasesComponent {
	reorder = (event: ReorderEvent<string[]>, list: string): void => {
		console.log(list, event.currentIndex);
	};

	save(): void {
		// Persists the order
	}
}
