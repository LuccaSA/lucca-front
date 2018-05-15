import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: 'lu-popover-target, [luPopoverTarget]',
	exportAs: 'LuPopoverTarget',
})
export class LuPopoverTarget {
	constructor(public _elementRef: ElementRef) {}
}
