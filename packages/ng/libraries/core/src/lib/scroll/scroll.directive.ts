import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

/**
 * emits on scroll events
 */
@Directive({
	selector: '[luScroll]',
})
export class LuScrollDirective {
	@Output() onScroll = new EventEmitter();
	@Output() onScrollTop = new EventEmitter();
	@Output() onScrollBottom = new EventEmitter();
	@Output() onScrollLeft = new EventEmitter();
	@Output() onScrollRight = new EventEmitter();
	@HostListener('onScroll')
	_scroll() {
		debugger;
	}
}
