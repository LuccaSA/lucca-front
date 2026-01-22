import { DecimalPipe, formatNumber } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, LOCALE_ID, ModelSignal, ViewChild, booleanAttribute, computed, input, model, numberAttribute, output, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { skip, take, tap } from 'rxjs';
import { PickerControlDirection } from './misc.utils';
import { RepeatOnHoldDirective } from './repeat-on-hold.directive';

let nextId = 0;

@Component({
	selector: 'lu-time-picker-part',
	imports: [RepeatOnHoldDirective, DecimalPipe, InputDirective],
	templateUrl: './time-picker-part.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPartComponent {
	readonly label = input('');

	readonly decimalConf = input('2.0-0');

	value: ModelSignal<number | '––'> = model('––');

	readonly display = input<number | '––'>();

	readonly max = input(0, {
		transform: numberAttribute,
	});

	readonly autoWidth = input(false, {
		transform: booleanAttribute,
	});

	readonly displayArrows = input(false, {
		transform: booleanAttribute,
	});

	readonly isReadonly = input(false, {
		transform: booleanAttribute,
	});

	readonly hideValue = input(false, {
		transform: booleanAttribute,
	});

	readonly disabled = input(false, {
		transform: booleanAttribute,
	});

	readonly focused = input(false, {
		transform: booleanAttribute,
	});

	readonly maxDigits = input<number>(2);

	readonly showZero = input(false, { transform: booleanAttribute });

	digitNumber = model(2);
	isValueSet = signal<boolean>(false);

	prevRequest = output<void>();
	nextRequest = output<void>();
	inputControlClick = output<PickerControlDirection>();
	touched = output<void>();

	@ViewChild('timePickerInput') timePickerInput?: ElementRef<HTMLInputElement>;

	valueLabel = computed(() => {
		if (this.hideValue()) {
			return '  ';
		}
		if (this.display() !== undefined) {
			return this.display();
		}
		const value = this.value();
		if (value === '––') {
			return value;
		}

		// remove comma separator for display
		const formattedNumber = formatNumber(value, this.locale, this.decimalConf()).replace(/,/g, '');
		const label = this.isValueSet() ? formattedNumber : '';

		// remove trailing 0 when value is not 0 or showZero is false
		return this.showZero() || value === 0 ? label : label.replace(/^0+/, '');
	});

	protected inputId = `time-picker-part-${nextId++}`;

	constructor(@Inject(LOCALE_ID) private locale: string) {
		ɵeffectWithDeps([this.valueLabel], (valueLabel) => {
			if (valueLabel) {
				if (valueLabel.toString().length > this.digitNumber() || valueLabel.toString().length < this.digitNumber()) {
					if (valueLabel.toString().length > 1) {
						this.digitNumber.set(valueLabel.toString().length);
					} else {
						this.digitNumber.set(2);
					}
				}
			}
		});
		toObservable(this.value)
			.pipe(
				skip(1),
				tap(() => this.isValueSet.set(true)),
				take(1),
			)
			.subscribe();
	}

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

		let val = value.slice(-this.digitNumber());

		if (value.length > this.digitNumber() && val.length < this.maxDigits()) {
			val = value;
		}

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
				this.digitNumber.set(2);
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
