import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { LuScrollDirective } from './scroll.directive';

@Component({
	selector: 'lu-scroll-test',
	imports: [LuScrollDirective],
	template: `
		@if (displayed()) {
			<div
				luScroll
				[debounceTime]="debounceTime()"
				(onScroll)="scrolled($event)"
				(onScrollTop)="scrolledTop($event)"
				(onScrollBottom)="scrolledBottom($event)"
				(onScrollLeft)="scrolledLeft($event)"
				(onScrollRight)="scrolledRight($event)"
			></div>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScrollTestComponent {
	readonly debounceTime = input(100);
	readonly displayed = input(true);

	scrolled = vi.fn();
	scrolledTop = vi.fn();
	scrolledBottom = vi.fn();
	scrolledLeft = vi.fn();
	scrolledRight = vi.fn();
}

interface ScrollGeometry {
	scrollTop: number;
	scrollLeft: number;
	scrollHeight: number;
	scrollWidth: number;
	clientHeight: number;
	clientWidth: number;
}

// happy-dom does no layout: scroll positions and sizes are stubbed on the element
function setGeometry(element: HTMLElement, geometry: ScrollGeometry) {
	Object.entries(geometry).forEach(([property, value]) => Object.defineProperty(element, property, { value, configurable: true }));
}

describe(LuScrollDirective.name, () => {
	let fixture: ComponentFixture<ScrollTestComponent>;
	let host: ScrollTestComponent;

	const getScrollable = () => (fixture.nativeElement as HTMLElement).querySelector('[luScroll]') as HTMLElement;
	const scroll = () => getScrollable().dispatchEvent(new Event('scroll'));

	beforeEach(() => {
		vi.useFakeTimers();
		TestBed.configureTestingModule({ imports: [ScrollTestComponent] });
		fixture = TestBed.createComponent(ScrollTestComponent);
		host = fixture.componentInstance;
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should emit onScroll once after the default 100ms debounce for a burst of scroll events', () => {
		// Arrange
		fixture.detectChanges();

		// Act
		scroll();
		scroll();
		scroll();
		vi.advanceTimersByTime(99);

		// Assert
		expect(host.scrolled).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(host.scrolled).toHaveBeenCalledOnce();
	});

	it('should debounce with a custom debounceTime', () => {
		// Arrange
		fixture.componentRef.setInput('debounceTime', 300);
		fixture.detectChanges();

		// Act
		scroll();
		vi.advanceTimersByTime(299);

		// Assert
		expect(host.scrolled).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(host.scrolled).toHaveBeenCalledOnce();
	});

	it('should emit onScrollTop and onScrollLeft when the scroll position is 0', () => {
		// Arrange
		fixture.detectChanges();
		setGeometry(getScrollable(), { scrollTop: 0, scrollLeft: 0, scrollHeight: 1000, scrollWidth: 1000, clientHeight: 200, clientWidth: 200 });

		// Act
		scroll();
		vi.advanceTimersByTime(100);

		// Assert
		expect(host.scrolledTop).toHaveBeenCalledOnce();
		expect(host.scrolledLeft).toHaveBeenCalledOnce();
		expect(host.scrolledBottom).not.toHaveBeenCalled();
		expect(host.scrolledRight).not.toHaveBeenCalled();
	});

	it('should emit onScrollBottom and onScrollRight when less than 10px from the end', () => {
		// Arrange
		fixture.detectChanges();
		// 1000 - 791 - 200 = 9px left before the end
		setGeometry(getScrollable(), { scrollTop: 791, scrollLeft: 791, scrollHeight: 1000, scrollWidth: 1000, clientHeight: 200, clientWidth: 200 });

		// Act
		scroll();
		vi.advanceTimersByTime(100);

		// Assert
		expect(host.scrolledBottom).toHaveBeenCalledOnce();
		expect(host.scrolledRight).toHaveBeenCalledOnce();
		expect(host.scrolledTop).not.toHaveBeenCalled();
		expect(host.scrolledLeft).not.toHaveBeenCalled();
	});

	it('should not emit onScrollBottom and onScrollRight when 10px or more from the end', () => {
		// Arrange
		fixture.detectChanges();
		// 1000 - 790 - 200 = 10px left before the end
		setGeometry(getScrollable(), { scrollTop: 790, scrollLeft: 790, scrollHeight: 1000, scrollWidth: 1000, clientHeight: 200, clientWidth: 200 });

		// Act
		scroll();
		vi.advanceTimersByTime(100);

		// Assert
		expect(host.scrolled).toHaveBeenCalledOnce();
		expect(host.scrolledBottom).not.toHaveBeenCalled();
		expect(host.scrolledRight).not.toHaveBeenCalled();
	});

	it('should not emit after the directive is destroyed', () => {
		// Arrange
		// Angular never calls the listeners of a destroyed output, it only warns (NG0953): the warning reveals a leaked subscription
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		fixture.detectChanges();
		const scrollable = getScrollable();

		// Act
		scrollable.dispatchEvent(new Event('scroll'));
		fixture.componentRef.setInput('displayed', false);
		fixture.detectChanges();
		vi.advanceTimersByTime(100);

		// Assert
		expect(host.scrolled).not.toHaveBeenCalled();
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});
});
