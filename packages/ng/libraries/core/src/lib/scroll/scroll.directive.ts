import { Directive, Output, HostListener, EventEmitter, ElementRef, OnInit, Input } from '@angular/core';
import { ILuScrollable } from './scroll.model';
import { Subject } from 'rxjs/Subject';
import { throttleTime, debounceTime } from 'rxjs/operators';

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
		this.scroll$.subscribe(scrollEvent => this.emitScrollEvents(scrollEvent));
	}
	private emitScrollEvents($event: Event) {
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
