import { ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, Signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { injectPointerNavigation } from './pointer-navigation';

@Component({
	selector: 'lu-pointer-navigation-test',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	pointerNavigation: Signal<boolean> = injectPointerNavigation();
}

@Component({
	selector: 'lu-scoped-pointer-navigation-test',
	template: '<div class="child"></div>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScopedHostComponent {
	readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	pointerNavigation: Signal<boolean> = injectPointerNavigation(this.host);
}

describe('injectPointerNavigation', () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;

	function createHost(): void {
		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
	}

	function moveMouse(): void {
		document.dispatchEvent(new MouseEvent('mousemove'));
	}

	function pressKey(): void {
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent, ScopedHostComponent] });
	});

	it('should assume keyboard navigation until proven otherwise', () => {
		// Act
		createHost();
		// Assert
		expect(host.pointerNavigation()).toBe(false);
	});

	it('should switch to pointer navigation on mousemove', () => {
		// Arrange
		createHost();
		// Act
		moveMouse();
		// Assert
		expect(host.pointerNavigation()).toBe(true);
	});

	it('should switch back to keyboard navigation on keydown', () => {
		// Arrange
		createHost();
		moveMouse();
		// Act
		pressKey();
		// Assert
		expect(host.pointerNavigation()).toBe(false);
	});

	it('should stay on keyboard navigation when only keys are pressed', () => {
		// Arrange
		createHost();
		// Act
		pressKey();
		// Assert
		expect(host.pointerNavigation()).toBe(false);
	});

	it('should register its listeners outside of the Angular zone', () => {
		// Arrange — TestBed provides a NoopNgZone, so leaving the zone has no observable effect here:
		// assert that the registration happens within `runOutsideAngular` instead, since that is what
		// keeps `mousemove` from scheduling a change detection run on every frame in a real app.
		let insideRunOutsideAngular = false;
		vi.spyOn(TestBed.inject(NgZone), 'runOutsideAngular').mockImplementation(((fn: () => unknown) => {
			insideRunOutsideAngular = true;
			try {
				return fn();
			} finally {
				insideRunOutsideAngular = false;
			}
		}) as NgZone['runOutsideAngular']);

		const registeredOutsideAngular: Record<string, boolean> = {};
		const addEventListener = document.addEventListener.bind(document);
		vi.spyOn(document, 'addEventListener').mockImplementation(((type: string, listener: EventListener, options?: AddEventListenerOptions) => {
			registeredOutsideAngular[type] = insideRunOutsideAngular;
			addEventListener(type, listener, options);
		}) as typeof document.addEventListener);

		// Act
		createHost();

		// Assert
		expect(registeredOutsideAngular['mousemove']).toBe(true);
		expect(registeredOutsideAngular['keydown']).toBe(true);
	});

	it('should stop listening once the injection context is destroyed', () => {
		// Arrange
		createHost();

		// Act
		fixture.destroy();
		moveMouse();

		// Assert
		expect(host.pointerNavigation()).toBe(false);
	});

	describe('when scoped to an element', () => {
		let scopedFixture: ComponentFixture<ScopedHostComponent>;
		let scopedHost: ScopedHostComponent;

		function createScopedHost(): void {
			scopedFixture = TestBed.createComponent(ScopedHostComponent);
			scopedHost = scopedFixture.componentInstance;
			scopedFixture.detectChanges();
		}

		it('should switch to pointer navigation when the mouse moves inside the scope', () => {
			// Arrange
			createScopedHost();
			// Act
			scopedHost.host.querySelector('.child')?.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
			// Assert
			expect(scopedHost.pointerNavigation()).toBe(true);
		});

		it('should stay on keyboard navigation when the mouse moves outside of the scope', () => {
			// Arrange
			createScopedHost();
			pressKey();
			// Act
			moveMouse();
			// Assert
			expect(scopedHost.pointerNavigation()).toBe(false);
		});

		it('should switch back to keyboard navigation when the mouse leaves the scope', () => {
			// Arrange — the key manager keeps the last hovered item active, and only keyboard mode
			// paints it, so leaving the panel must restore that highlight.
			createScopedHost();
			scopedHost.host.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
			// Act
			scopedHost.host.dispatchEvent(new MouseEvent('mouseleave'));
			// Assert
			expect(scopedHost.pointerNavigation()).toBe(false);
		});

		it('should switch back to pointer navigation when the mouse re-enters the scope', () => {
			// Arrange
			createScopedHost();
			scopedHost.host.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
			scopedHost.host.dispatchEvent(new MouseEvent('mouseleave'));
			// Act
			scopedHost.host.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
			// Assert
			expect(scopedHost.pointerNavigation()).toBe(true);
		});

		it('should still switch back to keyboard navigation on keydown outside of the scope', () => {
			// Arrange
			createScopedHost();
			scopedHost.host.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
			// Act
			pressKey();
			// Assert
			expect(scopedHost.pointerNavigation()).toBe(false);
		});
	});
});
