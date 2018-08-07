import { Directive, ElementRef } from '@angular/core';
import { ILuPopoverTarget } from './popover-target.model';

@Directive({
	selector: 'lu-popover-target, [luPopoverTarget]',
	exportAs: 'LuPopoverTarget',
})
export class LuPopoverTargetDirective implements ILuPopoverTarget {
	constructor(public _elementRef: ElementRef) {}
}
