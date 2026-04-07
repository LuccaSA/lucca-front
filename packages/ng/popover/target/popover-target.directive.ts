import { Directive, ElementRef, input } from '@angular/core';
import { syncSignal } from '@lucca-front/ng/core';
import { ALuPopoverTarget, LuPopoverAlignment, LuPopoverPosition } from './popover-target.model';

@Directive({
	selector: '[luPopoverTarget]',
	exportAs: 'LuPopoverTarget',
})
export class LuPopoverTargetDirective extends ALuPopoverTarget {
	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	inputPosition = input<LuPopoverPosition>(undefined, { alias: 'luPopoverPosition' });

	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	inputAlignment = input<LuPopoverAlignment>(undefined, { alias: 'luPopoverAlignment' });

	/** set to true if you want the panel to appear on top of the target */
	inputOverlap = input<boolean>(undefined, { alias: 'luPopoverOverlap' });

	inputOffsetX = input<number>(undefined, { alias: 'luPopoverOffsetX' });

	inputOffsetY = input<number>(undefined, { alias: 'luPopoverOffsetY' });

	constructor(ref: ElementRef) {
		super();
		this.elementRef = ref;

		syncSignal(this.inputPosition, (inputPosition) => (this.position = inputPosition));
		syncSignal(this.inputAlignment, (inputAlignment) => (this.alignment = inputAlignment));
		syncSignal(this.inputOverlap, (inputOverlap) => (this.overlap = inputOverlap));
		syncSignal(this.inputOffsetX, (inputOffsetX) => (this.offsetX = inputOffsetX));
		syncSignal(this.inputOffsetY, (inputOffsetY) => (this.offsetY = inputOffsetY));
	}
}
