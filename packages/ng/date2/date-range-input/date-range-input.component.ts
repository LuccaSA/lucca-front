import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	ElementRef,
	forwardRef,
	inject,
	Injector,
	input,
	OnInit,
	signal,
	viewChild,
	viewChildren,
	ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgModel, ValidationErrors, Validator } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { ClearComponent } from '@lucca-front/ng/clear';
import { isNil, LuClass, PortalContent, PortalDirective, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective, FilterPillInputComponent } from '@lucca-front/ng/filter-pills';
import { FORM_FIELD_INSTANCE, InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { addMonths, addYears, endOfDecade, endOfMonth, endOfYear, isAfter, isBefore, isSameDay, parse, startOfDay, startOfDecade, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';
import { map } from 'rxjs';
import { AbstractDateComponent } from '../abstract-date-component';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { DateRange, DateRangeInput } from '../calendar2/date-range';
import { compareCalendarPeriods, startOfPeriod, transformDateRangeInputToDateRange, transformDateRangeToDateRangeInput } from '../utils';
import { CalendarShortcut } from './calendar-shortcut';

let nextId = 0;

@Component({
	selector: 'lu-date-range-input',
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective, LayoutModule, PortalDirective, NgTemplateOutlet, FilterPillDisplayerDirective, ClearComponent],
	templateUrl: './date-range-input.component.html',
	styleUrl: './date-range-input.component.scss',
	host: {
		class: 'dateRangeField',
		'[class.mod-filterPill]': 'isFilterPill',
		'[class.mod-auto]': 'widthAuto()',
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
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => DateRangeInputComponent),
		},
		LuClass,
	],
})
export class DateRangeInputComponent extends AbstractDateComponent implements OnInit, ControlValueAccessor, Validator, FilterPillInputComponent {
	public parentInput = inject(FILTER_PILL_INPUT_COMPONENT, { optional: true, skipSelf: true });
	#injector = inject(Injector);
	#ngControl: NgControl; // Initialized in ngOnInit
	#luClass = inject(LuClass);

	#formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	#breakpointObserver = inject(BreakpointObserver);

	hasTwoCalendars = toSignal(this.#breakpointObserver.observe('(min-width: 40em)').pipe(map((state) => state.matches)));

	idSuffix = nextId++;

	startTextInputRef = viewChild<ElementRef<HTMLInputElement>>('start');

	endTextInputRef = viewChild<ElementRef<HTMLInputElement>>('end');

	// CVA stuff
	#onChange?: (value: DateRange) => void;

	initialValue = signal<DateRange | null>(undefined);
	selectedRange = signal<DateRange | null>(null);

	dateHovered = signal<Date | null>(null);

	placeholder = input<string>();

	widthAuto = input(false, { transform: booleanAttribute });

	label: PortalContent;

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, -8, 0),
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'top' },
			{
				overlayX: 'start',
				overlayY: 'bottom',
			},
			-8,
			-32,
		),
	];

	inputFocused = signal(false);

	editedField = signal<-1 | 0 | 1>(-1);

	highlightedField = signal<-1 | 0 | 1>(-1);

	shortcuts = input<readonly CalendarShortcut[]>();

	autocomplete = input<AutoFill>('off');

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

	endLabel = computed(() => {
		if (this.selectedRange()?.end && this.isValidDate(this.selectedRange()?.end)) {
			return this.getDateLabelForInput(this.selectedRange()?.end);
		}
		return '';
	});

	previousButton = viewChild<ElementRef<Element>>('previousButtonRef');

	nextButton = viewChild<ElementRef<Element>>('nextButtonRef');

	// Which calendar is currently being focused in, used for tabbable date logic
	focusedCalendarIndex = signal(0);

	focusedCalendar = computed(() => this.calendars()[this.focusedCalendarIndex()]);

	isFilterPill = false;

	isFilterPillEmpty = computed(() => this.selectedRange() === null);
	isFilterPillClearable = computed(() => this.clearable() ?? this.#defaultFilterPillClearable() ?? this.#defaultClearable);
	#defaultClearable = false;
	#defaultFilterPillClearable = signal<boolean | null>(null);

	filterPillPopoverCloseFn?: () => void;

	filterPillDisabled = signal(false);

	get isNavigationButtonFocused(): boolean {
		return [this.previousButton()?.nativeElement, this.nextButton()?.nativeElement].includes(document.activeElement);
	}

	constructor() {
		super();

		if (this.#formFieldRef) {
			this.#formFieldRef.rolePresentationLabel.set(true);
			this.label = this.#formFieldRef.label();
		}

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

	ngOnInit() {
		this.#ngControl = this.#injector.get(NgControl);
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

	popoverClosed(): void {
		this.panelClosed.emit();
		if (this.editedField() === 1) {
			this.endTextInputRef().nativeElement.focus();
		} else if (this.editedField() === 0) {
			this.startTextInputRef().nativeElement.focus();
		}
	}

	inputBlur(): void {
		this.onTouched?.();
		this.inputFocused.set(false);
		this.highlightedField.set(-1);
	}

	fixOrderIfNeeded(): void {
		if (this.selectedRange() && isAfter(this.selectedRange()?.start, this.selectedRange()?.end)) {
			const range = this.selectedRange();
			this.selectedRange.set({
				...range,
				end: range.start,
				start: range.end,
			});
			this.#onChange?.(this.selectedRange());
		}
	}

	tabbableDateChange(date: Date, calendarIndex: number) {
		if (calendarIndex == this.focusedCalendarIndex()) {
			this.tabbableDate.set(date);
		}
	}

	openPopover(ref: PopoverDirective, propertyToFocus?: 'start' | 'end', focusTabbableDate = false): void {
		if (this.isFilterPill) {
			return;
		}
		if (!ref.opened()) {
			ref.openPopover(true, true);
		}
		// Once popover is opened, aka in the next CD cycle, focus current tabbable date
		setTimeout(() => {
			this.focusedCalendarIndex.set(0);
			if (propertyToFocus && this.selectedRange()?.[propertyToFocus]) {
				// Specific case: if range is on a single month, focus on it on left calendar
				// Same goes for focus on start date, we want it on left panel
				if (propertyToFocus === 'start' || compareCalendarPeriods(this.mode(), this.selectedRange()?.start, this.selectedRange()?.end)) {
					this.currentDate.set(this.selectedRange()?.[propertyToFocus]);
					this.tabbableDate.set(this.selectedRange()?.[propertyToFocus]);
				} else {
					// Compute the date to use for proper focus on left panel, minus one calendar on focus date basically
					const leftPanelFocus = this.selectedRange()?.end;
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
			this.highlightedField.set(1);
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
				popoverRef?.close();
				this.filterPillPopoverCloseFn?.();
				this.endTextInputRef().nativeElement.focus();
				this.editedField.set(-1);
				this.dateHovered.set(null);
			} else {
				// Else, we're editing start field
				// If start is after end, invert them
				if (isAfter(date, this.selectedRange().end)) {
					this.selectedRange.set({
						start: date,
						scope: this.mode(),
					});
				} else {
					this.selectedRange.set({
						...this.selectedRange(),
						start: date,
						scope: this.mode(),
					});
				}
				this.editedField.set(1);
				this.highlightedField.set(1);
				this.dateHovered.set(null);
			}
		}

		this.#onChange?.(this.selectedRange());
	}

	arrowDown(popoverRef: PopoverDirective, fieldToFocus: 'start' | 'end'): void {
		this.openPopover(popoverRef, fieldToFocus, true);
		if (this.isFilterPill) {
			this.focusedCalendar()?.focusTabbableDate();
		} else if (this.editedField() === -1) {
			this.editedField.set(fieldToFocus === 'start' ? 0 : 1);
		}
	}

	validate(control: AbstractControl<DateRange | DateRangeInput | null>): ValidationErrors | null {
		if (!control.value) {
			return null;
		}
		const dateRange = transformDateRangeInputToDateRange(control.value);

		return this.isValidDate(dateRange.start) ? null : { date: true };
	}

	writeValue(dateRange: DateRange | DateRangeInput | null): void {
		if (this.#ngControl instanceof NgModel && isNil(this.#onChange)) {
			// avoid phantom call for ngModel
			// https://github.com/angular/angular/issues/14988#issuecomment-1310420293
			return;
		}
		const _dateRange = transformDateRangeInputToDateRange(dateRange);

		if (this.initialValue() === undefined) {
			this.initialValue.set(_dateRange);
		}

		if (dateRange != null) {
			this.selectedRange.set(_dateRange);
			this.currentDate.set(startOfDay(dateRange.start));
		}
	}

	registerOnChange(fn: (value: DateRange | DateRangeInput | null) => void): void {
		this.#onChange = (dateRange: DateRange | null) => {
			fn(dateRange && this.inDateISOFormat() ? transformDateRangeToDateRangeInput(dateRange) : dateRange);
		};
	}

	override setDisabledState(isDisabled: boolean) {
		this.filterPillDisabled.set(isDisabled);
		super.setDisabledState(isDisabled);
	}

	clear() {
		const newValue = this.clearBehavior() === 'reset' ? this.initialValue() : null;
		this.selectedRange.set(newValue);
		this.#onChange?.(this.selectedRange());
		this.onTouched?.();
		this.startTextInputRef().nativeElement.focus();
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

	selectShortcut(shortcut: CalendarShortcut, popover: PopoverDirective): void {
		this.selectedRange.set(shortcut.range);
		this.#onChange?.(this.selectedRange());
		popover?.close();
		this.filterPillPopoverCloseFn?.();
	}

	registerFilterPillClosePopover(closeFn: () => void): void {
		this.filterPillPopoverCloseFn = closeFn;
	}

	enableFilterPillMode(): void {
		this.isFilterPill = true;
		this.#defaultFilterPillClearable.set(true);
	}

	clearFilterPillValue(): void {
		this.clear();
	}

	getDefaultFilterPillIcon(): LuccaIcon {
		return 'calendarPlanning';
	}

	textInputChange(inputValue: string, rangeProperty: 'start' | 'end'): void {
		let currentRange: DateRange = this.selectedRange() || ({} as DateRange);
		if (inputValue?.length > 0) {
			const parsed = parse(inputValue, this.dateFormat, startOfDay(new Date()));
			if (parsed.getFullYear() > 999) {
				currentRange = {
					...currentRange,
					scope: this.mode(),
					[rangeProperty]: parsed,
				};
				this.currentDate.set(startOfDay(parsed));
				this.tabbableDate.set(startOfDay(parsed));
			} else if (this.isValidDate(parsed)) {
				currentRange = {
					...currentRange,
					scope: this.mode(),
					[rangeProperty]: parsed,
				};
			}
		} else if (inputValue !== null) {
			currentRange = {
				...currentRange,
				scope: this.mode(),
				[rangeProperty]: undefined,
			};
		}
		if (!currentRange.start && !currentRange.end) {
			this.selectedRange.set(null);
		} else {
			this.selectedRange.set(currentRange);
		}
		this.#onChange?.(this.selectedRange());
	}
}
