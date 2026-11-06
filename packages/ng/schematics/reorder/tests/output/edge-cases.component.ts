import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ReorderDirective, ReorderEvent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';

@Component({
	selector: 'app-edge-cases',
	imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective],
	template: `
		<ul cdkDropList luReorder (luReorder)="reorder($event, 'first')">
			<li cdkDrag luReorderItemLabel="First">First</li><!-- TODO: add luReorderItemLabel --> <li cdkDrag>Second</li>
		</ul>
		<ul cdkDropList luReorder (luReorder)="save()">
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
