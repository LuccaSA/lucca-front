import { Directive, ElementRef, input } from '@angular/core';
import { syncInputSignal } from '@lucca-front/ng/core';
import { ALuPopoverTarget, LuPopoverAlignment, LuPopoverPosition } from './popover-target.model';

@Directive({
	selector: '[luPopoverTarget]',
	exportAs: 'LuPopoverTarget',
})
export class LuPopoverTargetDirective extends ALuPopoverTarget {
	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	readonly inputPosition = input<LuPopoverPosition>(undefined, { alias: 'luPopoverPosition' });

	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	readonly inputAlignment = input<LuPopoverAlignment>(undefined, { alias: 'luPopoverAlignment' });

	/** set to true if you want the panel to appear on top of the target */
	readonly inputOverlap = input<boolean>(undefined, { alias: 'luPopoverOverlap' });

	readonly inputOffsetX = input<number>(undefined, { alias: 'luPopoverOffsetX' });

	readonly inputOffsetY = input<number>(undefined, { alias: 'luPopoverOffsetY' });

	constructor(ref: ElementRef) {
		super();
		this.elementRef = ref;

		syncInputSignal(this.inputPosition, (inputPosition) => (this.position = inputPosition));
		syncInputSignal(this.inputAlignment, (inputAlignment) => (this.alignment = inputAlignment));
		syncInputSignal(this.inputOverlap, (inputOverlap) => (this.overlap = inputOverlap));
		syncInputSignal(this.inputOffsetX, (inputOffsetX) => (this.offsetX = inputOffsetX));
		syncInputSignal(this.inputOffsetY, (inputOffsetY) => (this.offsetY = inputOffsetY));
	}
}
