import { Directive, input } from '@angular/core';
import { ɵRangeSelectableItem, ɵRangeSelection } from './range-selection';

/**
 * Wires the checkbox of a selectable item to the range selection of its container.
 */
@Directive({
	selector: '[luRangeSelection]',
	host: {
		'(click)': 'luRangeSelection()?.handleClick(luRangeSelectionItem(), $event)',
		'(keydown)': 'luRangeSelection()?.handleKey($event)',
		'(keyup)': 'luRangeSelection()?.handleKey($event)',
	},
})
export class ɵRangeSelectionDirective<T extends ɵRangeSelectableItem> {
	/** Range selection of the container, `null` to disable it on this checkbox. */
	readonly luRangeSelection = input<ɵRangeSelection<T> | null | undefined>(null);
	/** Item owning the checkbox. */
	readonly luRangeSelectionItem = input.required<T>();
}
