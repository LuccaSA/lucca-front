import { ChangeDetectionStrategy, Component, NgZone, Signal } from '@angular/core';
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
		TestBed.configureTestingModule({ imports: [HostComponent] });
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
});
