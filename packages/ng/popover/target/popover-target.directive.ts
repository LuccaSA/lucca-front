import { Directive, ElementRef, Input } from '@angular/core';
import { ALuPopoverTarget, LuPopoverAlignment, LuPopoverPosition } from './popover-target.model';

@Directive({
	selector: '[luPopoverTarget]',
	exportAs: 'LuPopoverTarget',
	standalone: true,
})
export class LuPopoverTargetDirective extends ALuPopoverTarget {
	constructor(ref: ElementRef) {
		super();
		this.elementRef = ref;
	}
	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	@Input('luPopoverPosition') set inputPosition(pos: LuPopoverPosition) {
		this.position = pos;
	}
	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	@Input('luPopoverAlignment') set inputAlignment(al: LuPopoverAlignment) {
		this.alignment = al;
	}
	/** set to true if you want the panel to appear on top of the target */
	@Input('luPopoverOverlap') set inputOverlap(ov: boolean) {
		this.overlap = ov;
	}

	@Input('luPopoverOffsetX') set inputOffsetX(ox: number) {
		this.offsetX = ox;
	}
	@Input('luPopoverOffsetY') set inputOffsetY(oy: number) {
		this.offsetY = oy;
	}
}
