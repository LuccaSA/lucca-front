import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { ɵRANGE_SELECTABLE_ITEM, ɵRangeSelection } from './range-selection';

/**
 * Wires the checkbox of a selectable item to the range selection of its container.
 * The item is the nearest provider of `ɵRANGE_SELECTABLE_ITEM`.
 * Hovering or focusing the checkbox makes the item the target of the range preview: only a click on the checkbox toggles it.
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
				const unregister = rangeSelection.register(this.item, this.#element);
				const unlisten = rangeSelection.listenTarget(this.item, this.#element);
				onCleanup(() => {
					unlisten();
					unregister();
				});
			}
		});
	}
}
