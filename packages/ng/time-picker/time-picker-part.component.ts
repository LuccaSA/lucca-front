import { CommonModule, formatNumber } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, Output, ViewChild } from '@angular/core';
import { RepeatOnHoldDirective } from './repeat-on-hold.directive';
import { PickerControlDirection } from './time-picker.model';

@Component({
	selector: 'lu-time-picker-part',
	standalone: true,
	imports: [CommonModule, RepeatOnHoldDirective],
	templateUrl: './time-picker-part.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPartComponent implements OnChanges {
	@Input() label = '';
	@Input() decimalConf = '2.0-0';
	@Input() value = 0;
	@Input() max = 0;
	@Input() displayArrows = false;
	@Input() isReadonly = false;
	@Input() hideValue = false;
	@Input() disabled = false;
	@Input() focused = false;
	@Output() valueChange = new EventEmitter<number>();
	@Output() prevRequest = new EventEmitter<void>();
	@Output() nextRequest = new EventEmitter<void>();
	@Output() inputControlClick = new EventEmitter<PickerControlDirection>();

	@ViewChild('timePickerInput') timePickerInput?: ElementRef<HTMLInputElement>;

	valueLabel = '';

	constructor(@Inject(LOCALE_ID) private locale: string) {}

	ngOnChanges(): void {
		this.valueLabel = this.hideValue ? '  ' : formatNumber(this.value, this.locale, this.decimalConf);
	}

	arrowKeyPressed(event: KeyboardEvent, isUpArrow: boolean): void {
		event.preventDefault();
		if (isUpArrow) {
			this.up();
		} else {
			this.down();
		}
	}

	up(): void {
		this.inputControlClick.emit('up');
	}

	down(): void {
		this.inputControlClick.emit('down');
	}

	keysInputHandler(event: Event): void {
		event.preventDefault();

		if (!(event.target instanceof HTMLInputElement) || !(event instanceof InputEvent)) {
			return;
		}

		if (event.data && /\D+/.test(event.data)) {
			event.target.value = String(this.value);
			return;
		}

		const value = event.target.value;

		let val = value.slice(-2);

		if (this.max && Number(val) * 10 > this.max) {
			this.moveRequest(event, 'next');
		}

		if (this.max && Number(val) > this.max) {
			val = value.slice(-1);
		}

		event.target.value = val;
		this.valueChange.emit(Number(val));
	}

	clearField(event: Event): void {
		if (event instanceof KeyboardEvent) {
			event.preventDefault();
		}

		this.valueChange.emit(0);
	}

	clickHandler(event: MouseEvent) {
		event.preventDefault();
	}

	keydownHandler(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowLeft':
				this.moveRequest(event, 'prev');
				break;
			case 'H':
			case 'h':
			case ':':
			case 'ArrowRight':
				this.moveRequest(event, 'next');
				break;
			case 'Delete':
			case 'Backspace':
				this.clearField(event);
				break;
			case 'ArrowUp':
				this.arrowKeyPressed(event, true);
				break;
			case 'ArrowDown':
				this.arrowKeyPressed(event, false);
				break;
		}
	}

	moveRequest(event: Event, direction: 'prev' | 'next'): void {
		event.preventDefault();

		if (direction === 'prev') {
			this.prevRequest.emit();
		} else {
			this.nextRequest.emit();
		}
	}

	focus(): void {
		if (this.timePickerInput) {
			this.timePickerInput.nativeElement.focus();
		}
	}
}
