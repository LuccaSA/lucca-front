import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, LOCALE_ID, model, signal, ViewChild, viewChild, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { addMonths, addYears, isSameDay, parse, startOfDay, startOfMonth } from 'date-fns';
import { PopoverDirective } from '../../popover2/popover.directive';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { CalendarMode } from '../calendar2/calendar-mode';
import { InputDirective } from '../../form-field/input.directive';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
	],
})
export class DateInputComponent implements ControlValueAccessor {
	#locale = inject(LOCALE_ID);

	#intlDateTimeFormat = new Intl.DateTimeFormat(this.#locale);

	#onChange?: (value: Date) => void;
	onTouched?: () => void;
	disabled = false;

	// Contains the current date format (like dd/mm/yy etc) based on current locale
	#dateFormat = this.#intlDateTimeFormat.formatToParts(new Date('01/01/2024')).reduce((acc, part) => {
		switch (part.type) {
			case 'day':
				return `${acc}${'d'.repeat(part.value.length)}`;
			case 'month':
				return `${acc}${'M'.repeat(part.value.length)}`;
			case 'year':
				return `${acc}${'y'.repeat(part.value.length)}`;
			case 'literal':
				return `${acc}${part.value}`;
		}
		return acc;
	}, '');

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, 6),
	];

	@ViewChild('popoverTrigger', { read: ElementRef, static: true })
	popoverTrigger: ElementRef<HTMLElement>;

	@ViewChild('date', { read: ElementRef, static: true })
	dateInput: ElementRef<HTMLInputElement>;

	calendarMode = signal<CalendarMode>('month');

	currentDate = model(startOfMonth(new Date()));

	selectedDate = signal<Date | null>(null);

	calendar = viewChild<ElementRef<HTMLDivElement>>('calendar');

	displayValue = computed(() => {
		if (this.selectedDate()) {
			console.log('FORMAT', this.selectedDate());
			return this.#intlDateTimeFormat.format(this.selectedDate());
		}
		return null;
	});

	userTextInput = signal<string>('');

	getDayInfo = (day: Date): CellStatus => {
		return {
			classes: [],
			selected: this.selectedDate() && isSameDay(day, this.selectedDate()),
		};
	};

	constructor() {
		effect(
			() => {
				const inputValue = this.userTextInput();
				const parsed = parse(inputValue, this.#dateFormat, startOfDay(new Date()));
				if (parsed.getFullYear() > 999) {
					this.selectedDate.set(startOfDay(parsed));
					this.currentDate.set(startOfDay(parsed));
				}
			},
			{ allowSignalWrites: true },
		);
		effect(() => {
			this.#onChange?.(this.selectedDate());
		});
	}

	writeValue(date: Date): void {
		if (date) {
			this.selectedDate.set(startOfDay(date));
			this.currentDate.set(startOfDay(date));
		}
	}

	registerOnChange(fn: any): void {
		this.#onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	prev() {
		this.move(-1);
	}

	next() {
		this.move(1);
	}

	move(direction: 1 | -1): void {
		switch (this.calendarMode()) {
			case 'decade':
				this.currentDate.set(addYears(this.currentDate(), direction * 10));
				break;
			case 'year':
				this.currentDate.set(addYears(this.currentDate(), direction));
				break;
			case 'month':
				this.currentDate.set(addMonths(this.currentDate(), direction));
				break;
		}
	}
}
