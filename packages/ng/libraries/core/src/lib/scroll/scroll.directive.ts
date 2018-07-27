import { Directive, Output, HostListener, EventEmitter, ElementRef } from '@angular/core';
import { ILuScrollable } from './scroll.model';

/**
 * emits on scroll events
 */
@Directive({
	selector: '[luScroll]',
	exportAs: 'luScroll',
})
export class LuScrollDirective implements ILuScrollable {
	@Output() onScroll = new EventEmitter<Event>();
	@Output() onScrollTop = new EventEmitter<Event>();
	@Output() onScrollBottom = new EventEmitter<Event>();
	@Output() onScrollLeft = new EventEmitter<Event>();
	@Output() onScrollRight = new EventEmitter<Event>();
	@HostListener('scroll', ['$event'])
	_scroll($event: Event) {
		this.onScroll.emit($event);
		const scrollLeft = $event.srcElement.scrollLeft;
		const scrollTop = $event.srcElement.scrollTop;
		if (scrollLeft === 0) {
			this.onScrollLeft.emit($event);
		}
		if (scrollTop === 0) {
			this.onScrollTop.emit($event);
		}
		const scrollWidth = $event.srcElement.scrollWidth;
		const scrollHeight = $event.srcElement.scrollHeight;
		const eltHeight = this._elementRef.nativeElement.clientHeight;
		const eltWidth = this._elementRef.nativeElement.clientWidth;
		if (scrollLeft === scrollWidth - eltWidth) {
			this.onScrollRight.emit($event);
		}
		if (scrollTop === scrollHeight - eltHeight) {
			this.onScrollBottom.emit($event);
		}
	}
	constructor(protected _elementRef: ElementRef) {
	}
}
