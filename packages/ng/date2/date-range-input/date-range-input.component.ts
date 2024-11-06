import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, input, Signal, signal, untracked, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuClass, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, addYears, endOfDecade, endOfMonth, endOfYear, isAfter, isBefore, isSameDay, parse, startOfDay, startOfDecade, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';
import { AbstractDateComponent } from '../abstract-date-component';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { DateRange } from '../calendar2/date-range';
import { startOfPeriod } from '../utils';
import { CalendarShortcut } from './calendar-shortcut';

let nextId = 0;

@Component({
	selector: 'lu-date-range-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective, ButtonComponent],
	templateUrl: './date-range-input.component.html',
	styleUrl: './date-range-input.component.scss',
	host: {
		class: 'dateRangeField',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateRangeInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => DateRangeInputComponent),
			multi: true,
		},
		LuClass,
	],
})
export class DateRangeInputComponent extends AbstractDateComponent implements ControlValueAccessor, Validator {
	#luClass = inject(LuClass);

	#formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	idSuffix = nextId++;

	// CVA stuff
	#onChange?: (value: DateRange) => void;

	selectedRange = signal<DateRange | null>(null);

	dateHovered = signal<Date | null>(null);

	placeholder = input<string>();

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, 6),
	];

	inputFocused = signal(false);

	editedField = signal<0 | 1>(0);

	shortcuts = input<CalendarShortcut[]>();

	protected currentRightDate = computed(() => {
		return this.getNextCalendarDate(this.currentDate());
	});

	protected currentStartDisplayDate = computed(() => {
		switch (this.mode()) {
			case 'day':
				return startOfMonth(this.currentDate());
			case 'month':
				return startOfYear(this.currentDate());
			case 'year':
				return startOfDecade(this.currentDate());
		}
	});

	protected currentEndDisplayDate = computed(() => {
		switch (this.mode()) {
			case 'day':
				return endOfMonth(this.currentRightDate());
			case 'month':
				return endOfYear(this.currentRightDate());
			case 'year':
				return endOfDecade(this.currentRightDate());
		}
	});

	calendars = viewChildren(Calendar2Component);

	combinedGetCellInfo = (date: Date, mode: CalendarMode): CellStatus => {
		const infoFromInput = this.getCellInfo()?.(date, mode);
		return {
			classes: [...(infoFromInput?.classes || [])],
			disabled: infoFromInput?.disabled || !this.isInMinMax(date, mode),
			selected: false,
			label: infoFromInput?.label,
		};
	};

	calendarRanges = computed(() => {
		if (this.selectedRange()) {
			return [this.selectedRange(), ...this.ranges()];
		}
		return this.ranges();
	});

	startLabel = computed(() => {
		if (this.selectedRange()?.start && this.isValidDate(this.selectedRange()?.start)) {
			return this.getDateLabelForInput(this.selectedRange()?.start);
		}
		return '';
	});

	startTextInput = signal('');

	endLabel = computed(() => {
		if (this.selectedRange()?.end && this.isValidDate(this.selectedRange()?.end)) {
			return this.getDateLabelForInput(this.selectedRange()?.end);
		}
		return '';
	});

	endTextInput = signal('');

	previousButton = viewChild<ElementRef<Element>>('previousButtonRef');

	nextButton = viewChild<ElementRef<Element>>('nextButtonRef');

	// Which calendar is currently being focused in, used for tabbable date logic
	focusedCalendarIndex = signal(0);

	focusedCalendar = computed(() => this.calendars()[this.focusedCalendarIndex()]);

	get isNavigationButtonFocused(): boolean {
		return [this.previousButton()?.nativeElement, this.nextButton()?.nativeElement].includes(document.activeElement);
	}

	constructor() {
		super();
		if (this.#formFieldRef) {
			this.#formFieldRef.layout = 'fieldset';
		}

		this.setupInputEffect(this.startTextInput, 'start');
		this.setupInputEffect(this.endTextInput, 'end');

		effect(() => {
			this.#onChange?.(this.selectedRange());
		});

		effect(() => {
			this.#luClass.setState({
				'mod-day': this.mode() === 'day',
				'mod-month': this.mode() === 'month',
				'mod-year': this.mode() === 'year',
			});
		});

		ɵeffectWithDeps([this.calendarMode, this.tabbableDate], (calendarMode, tabbableDate) => {
			if (tabbableDate) {
				if (isAfter(tabbableDate, this.currentEndDisplayDate())) {
					this.focusedCalendarIndex.set(0);
					this.currentDate.set(startOfPeriod(calendarMode, tabbableDate));
				} else if (isBefore(tabbableDate, this.currentStartDisplayDate())) {
					this.focusedCalendarIndex.set(1);
					switch (this.mode()) {
						case 'day':
							this.currentDate.set(subMonths(startOfPeriod(calendarMode, tabbableDate), 1));
							break;
						case 'month':
							this.currentDate.set(subYears(startOfPeriod(calendarMode, tabbableDate), 1));
							break;
						case 'year':
							this.currentDate.set(subYears(startOfPeriod(calendarMode, tabbableDate), 10));
							break;
					}
				} else {
					if (this.focusedCalendarIndex() === 1 && isBefore(tabbableDate, this.currentRightDate())) {
						this.focusedCalendarIndex.set(0);
					} else if (this.focusedCalendarIndex() === 0 && (isAfter(tabbableDate, this.currentRightDate()) || isSameDay(tabbableDate, this.currentRightDate()))) {
						this.focusedCalendarIndex.set(1);
					}
				}
			}
			if (!this.isNavigationButtonFocused && !this.inputFocused()) {
				this.focusedCalendar()?.blurTabbableDate();
				setTimeout(() => {
					this.focusedCalendar()?.focusTabbableDate();
				});
			}
		});
	}

	getNextCalendarDate(date: Date): Date {
		switch (this.mode()) {
			case 'day':
				return startOfMonth(addMonths(date, 1));
			case 'month':
				return startOfYear(addYears(date, 1));
			case 'year':
				return startOfDecade(addYears(date, 10));
		}
	}

	setupInputEffect(inputSignal: Signal<string>, rangeProperty: 'start' | 'end'): void {
		effect(
			() => {
				const inputValue = inputSignal();
				if (inputValue.length > 0) {
					const currentRange: DateRange = untracked(this.selectedRange) || ({} as DateRange);
					const parsed = parse(inputValue, this.dateFormat, startOfDay(new Date()));
					if (parsed.getFullYear() > 999) {
						this.selectedRange.set({
							...currentRange,
							scope: this.mode(),
							[rangeProperty]: parsed,
						});
						if (rangeProperty === 'start') {
							this.currentDate.set(startOfDay(parsed));
						}
					} else {
						this.selectedRange.set({
							...currentRange,
							scope: this.mode(),
							[rangeProperty]: parsed,
						});
					}
				}
			},
			{ allowSignalWrites: true },
		);
	}

	tabbableDateChange(date: Date, calendarIndex: number) {
		if (calendarIndex == this.focusedCalendarIndex()) {
			this.tabbableDate.set(date);
		}
	}

	openPopover(ref: PopoverDirective): void {
		ref.openPopover(true, true);
		// Once popover is opened, aka in the next CD cycle, focus current tabbable date
		setTimeout(() => {
			this.focusedCalendar()?.focusTabbableDate();
		});
	}

	dateClicked(date: Date, popoverRef: PopoverDirective, endField: HTMLInputElement): void {
		if (this.selectedRange() === null) {
			this.selectedRange.set({
				start: date,
				scope: this.mode(),
			});
			endField.focus();
		} else {
			// If we're editing end field
			if (this.editedField() === 1) {
				// If end is before start, invert them
				if (isBefore(date, this.selectedRange().start)) {
					this.selectedRange.set({
						start: date,
						scope: this.mode(),
						end: this.selectedRange().start,
					});
				} else {
					this.selectedRange.set({
						...this.selectedRange(),
						scope: this.mode(),
						end: date,
					});
				}
				popoverRef.close();
			} else {
				// Else, we're editing start field
				// If start is after end, invert them
				if (isAfter(date, this.selectedRange().end)) {
					this.selectedRange.set({
						start: this.selectedRange().end,
						scope: this.mode(),
						end: date,
					});
				} else {
					this.selectedRange.set({
						...this.selectedRange(),
						start: date,
						scope: this.mode(),
					});
				}
				popoverRef.close();
			}
		}
	}

	validate(control: AbstractControl<DateRange, DateRange>): ValidationErrors {
		return this.isValidDate(control.value?.start) ? null : { date: true };
	}

	writeValue(value: DateRange): void {
		if (value) {
			this.selectedRange.set(value);
			this.currentDate.set(startOfDay(value.start));
		}
	}

	registerOnChange(fn: (value: DateRange) => void): void {
		this.#onChange = fn;
	}

	clear(start: HTMLInputElement, end: HTMLInputElement) {
		start.value = '';
		end.value = '';
		this.selectedRange.set(null);
		this.onTouched?.();
	}

	currentDateChangeFromCalendar(date: Date): void {
		this.tabbableDate.set(date);
		this.currentDate.set(date);
	}

	getDateLabelForInput(date: Date): string {
		switch (this.mode()) {
			case 'day':
				return this.intlDateTimeFormat.format(date);
			case 'month':
				return this.intlDateTimeFormatMonth.format(date);
			case 'year':
				return this.intlDateTimeFormatYear.format(date);
		}
	}

	selectShortcut(shortcut: CalendarShortcut): void {
		this.selectedRange.set(shortcut.range);
	}
}
