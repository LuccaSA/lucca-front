/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ILuScrollable } from './scroll.model';

/**
 * emits on scroll events
 */
@Directive({
	selector: '[luScroll]',
	exportAs: 'luScroll',
})
export class LuScrollDirective implements ILuScrollable, OnInit {
	@Input() debounceTime = 100;
	@Output() onScroll = new EventEmitter<Event>();
	@Output() onScrollTop = new EventEmitter<Event>();
	@Output() onScrollBottom = new EventEmitter<Event>();
	@Output() onScrollLeft = new EventEmitter<Event>();
	@Output() onScrollRight = new EventEmitter<Event>();
	private scrollSubject = new Subject<Event>();
	private scroll$ = this.scrollSubject.asObservable().pipe(debounceTime(this.debounceTime));
	@HostListener('scroll', ['$event'])
	_scroll($event: Event) {
		this.scrollSubject.next($event);
	}

	ngOnInit(): void {
		this.scroll$.subscribe((scrollEvent) => this.emitScrollEvents(scrollEvent));
	}
	private emitScrollEvents($event: Event) {
		this.onScroll.emit($event);

		const target = $event.target;
		if (target instanceof Element) {
			const scrollLeft = target.scrollLeft;
			const scrollTop = target.scrollTop;
			if (scrollLeft === 0) {
				this.onScrollLeft.emit($event);
			}
			if (scrollTop === 0) {
				this.onScrollTop.emit($event);
			}
			const scrollWidth = target.scrollWidth;
			const scrollHeight = target.scrollHeight;
			const eltHeight = this._elementRef.nativeElement.clientHeight;
			const eltWidth = this._elementRef.nativeElement.clientWidth;
			if (scrollWidth - scrollLeft - eltWidth < 10) {
				this.onScrollRight.emit($event);
			}
			if (scrollHeight - scrollTop - eltHeight < 10) {
				this.onScrollBottom.emit($event);
			}
		}
	}
	constructor(protected _elementRef: ElementRef<HTMLElement>) {}
}
