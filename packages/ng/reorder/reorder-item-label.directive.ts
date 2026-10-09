import { Directive, input } from '@angular/core';

@Directive({
	selector: '[luReorderItemLabel]',
})
export class ReorderItemLabelDirective {
	/**
	 * Name of the item, used by its reorder handle ("Move {{item}}") and in the announcement made after a move
	 */
	readonly luReorderItemLabel = input.required<string>();
}
