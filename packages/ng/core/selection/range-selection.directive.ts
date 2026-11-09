import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { ɵRANGE_SELECTABLE_ITEM, ɵRangeSelection } from './range-selection';

/**
 * Wires the checkbox of a selectable item to the range selection of its container.
 * The item is the nearest provider of `ɵRANGE_SELECTABLE_ITEM`.
 */
@Directive({
	selector: '[luRangeSelection]',
	host: {
		'(click)': 'luRangeSelection()?.handleClick(item, $event)',
		'(keydown)': 'luRangeSelection()?.handleKey($event)',
		'(keyup)': 'luRangeSelection()?.handleKey($event)',
	},
})
export class ɵRangeSelectionDirective {
	/** Range selection of the container, `null` to keep this checkbox out of it. */
	readonly luRangeSelection = input<ɵRangeSelection | null | undefined>(null);

	protected readonly item = inject(ɵRANGE_SELECTABLE_ITEM);
	readonly #element = inject<ElementRef<Element>>(ElementRef).nativeElement;

	constructor() {
		effect((onCleanup) => {
			const rangeSelection = this.luRangeSelection();
			if (rangeSelection) {
				onCleanup(rangeSelection.register(this.item, this.#element));
			}
		});
	}
}
