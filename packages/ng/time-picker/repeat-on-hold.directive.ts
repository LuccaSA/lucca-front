import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

const INITIAL_INTERVAL = 500;

@Directive({
	selector: '[luRepeatOnHold]',
	standalone: true,
})
export class RepeatOnHoldDirective implements OnDestroy, OnInit {
	@Output() hold = new EventEmitter<void>();

	onMouseDown = () => {
		if (this.startTime !== undefined) {
			return;
		}

		this.hold.emit();
		this.animationFrameId = window.requestAnimationFrame(this.animationFrameHandler);

		window.removeEventListener('mouseup', this.onWindowMouseUp);
		window.addEventListener('mouseup', this.onWindowMouseUp);
	};

	onWindowMouseUp = () => {
		this.cancelAnimationFrame();
	};

	constructor(private elementRef: ElementRef<HTMLElement>) {}

	ngOnInit(): void {
		this.elementRef.nativeElement.addEventListener('mousedown', this.onMouseDown);
	}

	interval = INITIAL_INTERVAL;
	startTime: number | undefined = undefined;
	previousTime: number | undefined = undefined;
	animationFrameId: number | undefined = undefined;

	private cancelAnimationFrame(): void {
		if (this.animationFrameId) {
			this.previousTime = undefined;
			this.interval = INITIAL_INTERVAL;
			this.startTime = undefined;
			window.cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = undefined;
		}
	}

	private animationFrameHandler = (time: number): void => {
		if (this.startTime === undefined) {
			this.startTime = time;
		}

		if (this.previousTime === undefined) {
			this.previousTime = time;
		}

		if (time - this.previousTime > this.interval) {
			this.hold.emit();
			this.previousTime = time;
		}

		if (time - this.startTime > 1000) {
			this.interval = 200;
		}

		if (time - this.startTime > 2000) {
			this.interval = 50;
		}

		this.animationFrameId = window.requestAnimationFrame(this.animationFrameHandler);
	};

	ngOnDestroy(): void {
		this.elementRef.nativeElement.removeEventListener('mousedown', this.onMouseDown);
		window.removeEventListener('mouseup', this.onWindowMouseUp);
		this.cancelAnimationFrame();
	}
}
