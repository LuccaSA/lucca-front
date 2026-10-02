import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { RepeatOnHoldDirective } from './repeat-on-hold.directive';

@Component({
	selector: 'lu-repeat-on-hold-test',
	imports: [RepeatOnHoldDirective],
	template: `
		@if (displayed()) {
			<button type="button" luRepeatOnHold (hold)="holdCount = holdCount + 1">Hold me</button>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RepeatOnHoldTestComponent {
	readonly displayed = input(true);

	holdCount = 0;
}

describe(RepeatOnHoldDirective.name, () => {
	let fixture: ComponentFixture<RepeatOnHoldTestComponent>;
	let host: RepeatOnHoldTestComponent;
	let button: HTMLButtonElement;
	let pendingFrames: Map<number, FrameRequestCallback>;
	let nextFrameId: number;

	const mouseDown = () => button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
	const releaseMouse = () => window.dispatchEvent(new MouseEvent('mouseup'));

	/** Runs every pending animation frame callback with the given timestamp. */
	const runFrame = (time: number) => {
		const callbacks = [...pendingFrames.values()];
		pendingFrames.clear();
		callbacks.forEach((callback) => callback(time));
	};

	/** Runs animation frames every `step` ms from `from` to `to` (inclusive), returning the timestamps of the frames that emitted. */
	const runFrames = (from: number, to: number, step = 10): number[] => {
		const emittedAt: number[] = [];
		for (let time = from; time <= to; time += step) {
			const countBefore = host.holdCount;
			runFrame(time);
			if (host.holdCount > countBefore) {
				emittedAt.push(time);
			}
		}
		return emittedAt;
	};

	beforeEach(() => {
		pendingFrames = new Map();
		nextFrameId = 1;
		vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
			const id = nextFrameId++;
			pendingFrames.set(id, callback);
			return id;
		});
		vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => pendingFrames.delete(id));

		TestBed.configureTestingModule({
			imports: [RepeatOnHoldTestComponent],
		});

		fixture = TestBed.createComponent(RepeatOnHoldTestComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
		button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
	});

	describe('hold', () => {
		it('should emit once as soon as the mouse is pressed', () => {
			// Act
			mouseDown();
			// Assert
			expect(host.holdCount).toBe(1);
		});

		it('should not emit again before the initial interval of 500ms', () => {
			// Arrange
			mouseDown();
			// Act
			const emittedAt = runFrames(0, 500);
			// Assert
			expect(emittedAt).toEqual([]);
			expect(host.holdCount).toBe(1);
		});

		it('should repeat every 500ms during the first second', () => {
			// Arrange
			mouseDown();
			// Act
			const emittedAt = runFrames(0, 1000);
			// Assert
			expect(emittedAt).toEqual([510]);
		});

		it('should accelerate to every 200ms after 1s, then to every 50ms after 2s', () => {
			// Arrange
			mouseDown();
			// Act
			const emittedAt = runFrames(0, 2200);
			// Assert
			expect(emittedAt).toEqual([510, 1020, 1230, 1440, 1650, 1860, 2020, 2080, 2140, 2200]);
		});

		it('should ignore a new mousedown while already holding', () => {
			// Arrange
			mouseDown();
			runFrame(0);
			// Act
			mouseDown();
			// Assert
			expect(host.holdCount).toBe(1);
			expect(pendingFrames.size).toBe(1);
		});
	});

	describe('release', () => {
		it('should stop repeating when the mouse is released', () => {
			// Arrange
			mouseDown();
			runFrames(0, 600);
			const countAtRelease = host.holdCount;
			// Act
			releaseMouse();
			runFrames(610, 3000);
			// Assert
			expect(host.holdCount).toBe(countAtRelease);
			expect(pendingFrames.size).toBe(0);
		});

		it('should stop repeating when the mouse is released outside of the element', () => {
			// Arrange
			mouseDown();
			runFrame(0);
			// Act
			document.body.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
			runFrames(10, 3000);
			// Assert
			expect(host.holdCount).toBe(1);
			expect(pendingFrames.size).toBe(0);
		});

		it('should restart at the initial pace on the next hold', () => {
			// Arrange
			mouseDown();
			runFrames(0, 2500);
			releaseMouse();
			const countAfterFirstHold = host.holdCount;
			// Act
			mouseDown();
			const emittedAt = runFrames(5000, 6000);
			// Assert
			expect(host.holdCount - countAfterFirstHold).toBe(2);
			expect(emittedAt).toEqual([5510]);
		});

		it('should accept a new hold right after release', () => {
			// Arrange
			mouseDown();
			runFrame(0);
			releaseMouse();
			// Act
			mouseDown();
			// Assert
			expect(host.holdCount).toBe(2);
		});
	});

	describe('destroy', () => {
		it('should stop repeating when destroyed while holding', () => {
			// Arrange
			mouseDown();
			runFrame(0);
			// Act
			fixture.componentRef.setInput('displayed', false);
			fixture.detectChanges();
			runFrames(10, 3000);
			// Assert
			expect(host.holdCount).toBe(1);
			expect(pendingFrames.size).toBe(0);
		});

		it('should stop listening to mousedown once destroyed', () => {
			// Arrange
			const detachedButton = button;
			fixture.componentRef.setInput('displayed', false);
			fixture.detectChanges();
			// Act
			detachedButton.dispatchEvent(new MouseEvent('mousedown'));
			// Assert
			expect(host.holdCount).toBe(0);
		});
	});
});
