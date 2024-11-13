import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, input, Signal, signal, untracked, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LuClass, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, addYears, endOfDecade, endOfMonth, endOfYear, isAfter, isBefore, isSameDay, parse, startOfDay, startOfDecade, startOfMonth, startOfYear, sub, subMonths, subYears } from 'date-fns';
import { map } from 'rxjs';
import { AbstractDateComponent } from '../abstract-date-component';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { DateRange } from '../calendar2/date-range';
import { compareCalendarPeriods, startOfPeriod } from '../utils';
import { CalendarShortcut } from './calendar-shortcut';

let nextId = 0;

@Component({
	selector: 'lu-date-range-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective, LayoutModule],
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

	#breakpointObserver = inject(BreakpointObserver);

	hasTwoCalendars = toSignal(this.#breakpointObserver.observe('(min-width: 40em)').pipe(map((state) => state.matches)));

	idSuffix = nextId++;

	// CVA stuff
	#onChange?: (value: DateRange) => void;

	selectedRange = signal<DateRange | null>(null);

	dateHovered = signal<Date | null>(null);

	placeholder = input<string>();

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, -1, 6),
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'top' },
			{
				overlayX: 'start',
				overlayY: 'bottom',
			},
			-1,
			-32,
		),
	];

	inputFocused = signal(false);

	editedField = signal<-1 | 0 | 1>(-1);

	shortcuts = input<CalendarShortcut[]>();

	protected currentRightDate = computed(() => {
		return this.hasTwoCalendars() ? this.getNextCalendarDate(this.currentDate()) : this.currentDate();
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

	startTextInput = signal<string | null>(null);

	endLabel = computed(() => {
		if (this.selectedRange()?.end && this.isValidDate(this.selectedRange()?.end)) {
			return this.getDateLabelForInput(this.selectedRange()?.end);
		}
		return '';
	});

	endTextInput = signal<string | null>(null);

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
					if (this.hasTwoCalendars()) {
						this.focusedCalendarIndex.set(1);
					}
					switch (this.mode()) {
						case 'day':
							this.currentDate.set(this.hasTwoCalendars() ? subMonths(startOfPeriod(calendarMode, tabbableDate), 1) : startOfPeriod(calendarMode, tabbableDate));
							break;
						case 'month':
							this.currentDate.set(this.hasTwoCalendars() ? subYears(startOfPeriod(calendarMode, tabbableDate), 1) : startOfPeriod(calendarMode, tabbableDate));
							break;
						case 'year':
							this.currentDate.set(this.hasTwoCalendars() ? subYears(startOfPeriod(calendarMode, tabbableDate), 10) : startOfPeriod(calendarMode, tabbableDate));
							break;
					}
				} else if (this.hasTwoCalendars()) {
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

	setupInputEffect(inputSignal: Signal<string | null>, rangeProperty: 'start' | 'end'): void {
		effect(
			() => {
				const inputValue = inputSignal();
				const currentRange: DateRange = untracked(this.selectedRange) || ({} as DateRange);
				if (inputValue?.length > 0) {
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
				} else if (inputValue !== null) {
					this.selectedRange.set({
						...currentRange,
						scope: this.mode(),
						[rangeProperty]: undefined,
					});
				}
			},
			{ allowSignalWrites: true },
		);
	}

	inputBlur(): void {
		this.onTouched?.();
		this.inputFocused.set(false);
	}

	fixOrderIfNeeded(): void {
		if (this.selectedRange() && isAfter(this.selectedRange()?.start, this.selectedRange()?.end)) {
			const range = this.selectedRange();
			this.selectedRange.set({
				...range,
				end: range.start,
				start: range.end,
			});
		}
	}

	tabbableDateChange(date: Date, calendarIndex: number) {
		if (calendarIndex == this.focusedCalendarIndex()) {
			this.tabbableDate.set(date);
		}
	}

	openPopover(ref: PopoverDirective, propertyToFocus?: 'start' | 'end', focusTabbableDate = false): void {
		ref.openPopover(true, true);
		// Once popover is opened, aka in the next CD cycle, focus current tabbable date
		setTimeout(() => {
			this.focusedCalendarIndex.set(0);
			if (propertyToFocus && this.selectedRange()?.[propertyToFocus]) {
				// Specific case: if range is on a single month, focus on it on left calendar
				// Same goes for focus on start date, we want it on left panel
				if (propertyToFocus === 'start' || compareCalendarPeriods(this.mode(), this.selectedRange()?.start, this.selectedRange()?.end)) {
					this.currentDate.set(this.selectedRange()?.start);
					this.tabbableDate.set(this.selectedRange()?.start);
				} else {
					// Compute the date to use for proper focus on left panel, minus one calendar on focus date basically
					const leftPanelFocus = sub(this.selectedRange()?.end, {
						months: this.mode() === 'day' ? 1 : 0,
						years: this.mode() === 'month' ? 1 : this.mode() === 'year' ? 10 : 0,
					});
					this.currentDate.set(leftPanelFocus);
					this.tabbableDate.set(leftPanelFocus);
				}
			}
			if (focusTabbableDate) {
				this.focusedCalendar()?.focusTabbableDate();
			}
		});
	}

	dateClicked(date: Date, popoverRef: PopoverDirective): void {
		if (this.selectedRange() === null) {
			this.selectedRange.set({
				start: date,
				scope: this.mode(),
			});
			this.editedField.set(1);
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
				this.editedField.set(-1);
				this.dateHovered.set(null);
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
				this.editedField.set(-1);
				this.dateHovered.set(null);
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
