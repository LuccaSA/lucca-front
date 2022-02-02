import { ElementRef } from '@angular/core';
import { throwLuPopoverInvalidAlignement, throwLuPopoverInvalidPosition } from './popover-target.error';

export type LuPopoverPosition = 'above' | 'below' | 'before' | 'after';
export type LuPopoverAlignment = 'top' | 'bottom' | 'left' | 'right' | 'center';

/**
 * anchor for a popover panel
 */
export interface ILuPopoverTarget {
	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	alignment: LuPopoverAlignment;
	/** the element used to position the panel */
	elementRef: ElementRef;
	// /** set to true if you want the panel to appear on top of the target */
	overlap: boolean;
	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	position: LuPopoverPosition;

	offsetX: number;
	offsetY: number;
}

export abstract class ALuPopoverTarget implements ILuPopoverTarget {
	protected _elementRef: ElementRef;
	/** the element used to position the panel */
	get elementRef() {
		return this._elementRef;
	}
	set elementRef(ref: ElementRef) {
		this._elementRef = ref;
	}

	protected _position: LuPopoverPosition = 'below';
	/** how you want to position the panel relative to the target, allowed values: above, below, before, after */
	get position(): LuPopoverPosition {
		return this._position;
	}
	set position(position: LuPopoverPosition) {
		if (position !== 'above' && position !== 'below' && position !== 'after' && position !== 'before') {
			throwLuPopoverInvalidPosition();
		}
		this._position = position;
		// this.setPositionClasses(this._position, this._alignment);
	}

	protected _alignment: LuPopoverAlignment = 'center';
	/** how the panel will be align with the target, allowed values: top, bottom, left, right */
	get alignment(): LuPopoverAlignment {
		return this._alignment;
	}
	set alignment(alignment: LuPopoverAlignment) {
		if (alignment !== 'center' && alignment !== 'top' && alignment !== 'bottom' && alignment !== 'right' && alignment !== 'left') {
			throwLuPopoverInvalidAlignement();
		}
		this._alignment = alignment;
		// this.setPositionClasses(this._position, this._alignment);
	}

	protected _overlap = false;
	/** set to true if you want the panel to appear on top of the target */
	get overlap() {
		return this._overlap;
	}
	set overlap(ot: boolean) {
		this._overlap = ot;
	}

	protected _offsetX = 0;
	get offsetX() {
		return this._offsetX;
	}
	set offsetX(ox: number) {
		this._offsetX = ox;
	}

	protected _offsetY = 0;
	get offsetY() {
		return this._offsetY;
	}
	set offsetY(oy: number) {
		this._offsetY = oy;
	}
}

export class LuPopoverTarget extends ALuPopoverTarget {
	constructor() {
		super();
	}
}
