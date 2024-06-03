import { DecimalPipe, formatNumber } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	EventEmitter,
	Inject,
	input,
	LOCALE_ID,
	model,
	ModelSignal,
	numberAttribute,
	Output,
	ViewChild,
} from '@angular/core';
import { RepeatOnHoldDirective } from './repeat-on-hold.directive';
import { PickerControlDirection } from './misc.utils';
import { InputDirective } from '@lucca-front/ng/form-field';

let nextId = 0;

@Component({
	selector: 'lu-time-picker-part',
	standalone: true,
	imports: [RepeatOnHoldDirective, DecimalPipe, InputDirective],
	templateUrl: './time-picker-part.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPartComponent {
	label = input('');

	decimalConf = input('2.0-0');

	value: ModelSignal<number | '--'> = model('--');

	max = input(0, {
		transform: numberAttribute,
	});

	displayArrows = input(false, {
		transform: booleanAttribute,
	});

	isReadonly = input(false, {
		transform: booleanAttribute,
	});

	hideValue = input(false, {
		transform: booleanAttribute,
	});

	disabled = input(false, {
		transform: booleanAttribute,
	});

	focused = input(false, {
		transform: booleanAttribute,
	});

	@Output() prevRequest = new EventEmitter<void>();
	@Output() nextRequest = new EventEmitter<void>();
	@Output() inputControlClick = new EventEmitter<PickerControlDirection>();
	@Output() touched = new EventEmitter<void>();

	@ViewChild('timePickerInput') timePickerInput?: ElementRef<HTMLInputElement>;

	valueLabel = computed(() => {
		if (this.hideValue()) {
			return '  ';
		}
		const value = this.value();
		if (value === '--') {
			return value;
		}
		return formatNumber(value, this.locale, this.decimalConf());
	});

	protected inputId = `time-picker-part-${nextId++}`;

	constructor(@Inject(LOCALE_ID) private locale: string) {}

	arrowKeyPressed(event: KeyboardEvent, isUpArrow: boolean): void {
		event.preventDefault();
		this.inputControlClick.emit(isUpArrow ? 'up' : 'down');
	}

	keysInputHandler(event: Event): void {
		event.preventDefault();

		if (!(event.target instanceof HTMLInputElement) || !(event instanceof InputEvent)) {
			return;
		}

		if (event.data && /\D+/.test(event.data)) {
			event.target.value = String(this.value());
			return;
		}

		const value = event.target.value;

		let val = value.slice(-2) || '00';

		if (this.max() && Number(val) * 10 > this.max()) {
			this.moveRequest(event, 'next');
		}

		if (this.max() && Number(val) > this.max()) {
			val = value.slice(-1);
		}

		event.target.value = val;
		this.value.set(Number(val));
	}

	clearField(event: Event): void {
		if (event instanceof KeyboardEvent) {
			event.preventDefault();
		}

		this.value.set(0);
	}

	clickHandler(event: MouseEvent) {
		event.preventDefault();
	}

	up(): void {
		this.inputControlClick.emit('up');
	}

	down(): void {
		this.inputControlClick.emit('down');
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
