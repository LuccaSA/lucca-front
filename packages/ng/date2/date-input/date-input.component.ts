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
	HostBinding,
	inject,
	Injector,
	input,
	OnInit,
	signal,
	untracked,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgModel, Validator } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { isNil, LuClass, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective, FilterPillInputComponent } from '@lucca-front/ng/filter-pills';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { isSameDay, parse, startOfDay } from 'date-fns';
import { AbstractDateComponent } from '../abstract-date-component';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { comparePeriods, startOfPeriod, transformDateInputToDate, transformDateToDateISO } from '../utils';

export type DateInputValidatorErrorType = {
	min: true;
	max: true;
	date: true;
};

@Component({
	selector: 'lu-date-input',
	standalone: true,
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective, NgTemplateOutlet, FilterPillDisplayerDirective],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	host: {
		class: 'dateField',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => DateInputComponent),
			multi: true,
		},
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => DateInputComponent),
		},
		LuClass,
	],
})
export class DateInputComponent extends AbstractDateComponent implements OnInit, ControlValueAccessor, Validator, FilterPillInputComponent {
	#injector = inject(Injector);
	#ngControl: NgControl; // Initialized in ngOnInit

	// CVA stuff
	#onChange?: (value: Date | null) => void;

	#luClass = inject(LuClass);

	autocomplete = input<string>('');

	placeholder = input<string>();

	disableOverflow = input(false, { transform: booleanAttribute });
	hideOverflow = input(false, { transform: booleanAttribute });
	widthAuto = input(false, { transform: booleanAttribute });

	filterPillDisabled = signal(false);

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

	selectedDate = signal<Date | null>(null);

	initialValue = signal<Date | null>(undefined);
	dateFromWriteValue = signal<Date | null>(null);

	calendar = viewChild(Calendar2Component);

	inputRef = viewChild<ElementRef<HTMLInputElement>>('date');

	displayValue = computed(() => {
		if (this.selectedDate() && this.isValidDate(this.selectedDate())) {
			let formatter: Intl.DateTimeFormat;
			switch (this.mode()) {
				case 'day':
					formatter = this.intlDateTimeFormat;
					break;
				case 'month':
					formatter = this.intlDateTimeFormatMonth;
					break;
				case 'year':
					formatter = this.intlDateTimeFormatYear;
					break;
			}
			return formatter.format(this.selectedDate());
		}
		const textInput = this.userTextInput();
		// If we are initializing the component, we don't want to display the value
		if (textInput === 'ɵ') {
			return '';
		}
		return textInput;
	});

	// We need to use a "magic key" here to avoid sending a null value change on initialization
	userTextInput = signal<string>('ɵ');

	combinedGetCellInfo = (date: Date, mode: CalendarMode): CellStatus => {
		const infoFromInput = this.getCellInfo()?.(date, mode);
		return {
			classes: [...(infoFromInput?.classes || [])],
			disabled: infoFromInput?.disabled || !this.isInMinMax(date, mode),
			selected: this.selectedDate() && this.calendarMode() === mode && comparePeriods(mode, date, this.selectedDate()),
			label: infoFromInput?.label,
		};
	};

	previousButton = viewChild<ElementRef<Element>>('previousButtonRef');

	nextButton = viewChild<ElementRef<Element>>('nextButtonRef');

	@HostBinding('class.mod-filterPill')
	isFilterPill = false;

	@HostBinding('class.mod-auto')
	get isWidthAuto() {
		return this.widthAuto();
	}

	isFilterPillEmpty = computed(() => !this.selectedDate());
	isFilterPillClearable = computed(() => this.clearable() ?? this.#defaultFilterPillClearable() ?? this.#defaultClearable);
	#defaultClearable = false;
	#defaultFilterPillClearable = signal<boolean | null>(null);

	filterPillPopoverCloseFn?: () => void;

	get isNavigationButtonFocused(): boolean {
		return [this.previousButton()?.nativeElement, this.nextButton()?.nativeElement].includes(document.activeElement);
	}

	constructor() {
		super();

		effect(() => {
			const inputValue = this.userTextInput();
			// If we are initializing the component, we don't want to parse the value
			if (inputValue === 'ɵ') {
				return;
			}
			if (inputValue.length > 0) {
				let parsed: Date;
				try {
					parsed = parse(inputValue, this.dateFormat, startOfDay(new Date()));
				} catch {
					/* not a correct date */
				}
				if (parsed instanceof Date && parsed.getFullYear() > 999) {
					this.selectedDate.set(startOfDay(parsed));
					this.currentDate.set(startOfDay(parsed));
					this.tabbableDate.set(startOfDay(parsed));
				} else if (!this.isFilterPill) {
					this.onTouched?.();
					this.selectedDate.set(parsed);
				}
			} else {
				this.selectedDate.set(null);
			}
		});

		effect(() => {
			if (!this.#safeCompareDate(untracked(this.dateFromWriteValue), this.selectedDate())) {
				this.#onChange?.(this.selectedDate());
				this.dateFromWriteValue.set(null);
			}
		});

		effect(() => {
			this.#luClass.setState({
				'mod-day': this.mode() === 'day',
				'mod-month': this.mode() === 'month',
				'mod-year': this.mode() === 'year',
			});
		});

		ɵeffectWithDeps([this.calendarMode, this.tabbableDate], (calendarMode, tabbableDate) => {
			if (tabbableDate && !comparePeriods(calendarMode, tabbableDate, this.currentDate())) {
				this.currentDate.set(startOfPeriod(calendarMode, tabbableDate));
			}
			if (!this.isNavigationButtonFocused && !this.inputFocused()) {
				this.calendar()?.blurTabbableDate();
				setTimeout(() => {
					this.calendar()?.focusTabbableDate();
				});
			}
		});
	}

	ngOnInit() {
		this.#ngControl = this.#injector.get(NgControl);
	}

	#safeCompareDate(a: Date, b: Date): boolean {
		return a === b || (!!a && !!b && isSameDay(a, b));
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
		return 'calendarDate';
	}

	openPopover(ref: PopoverDirective): void {
		if (!this.isFilterPill) {
			ref.openPopover(true, true);
			// Once popover is opened, aka in the next CD cycle, focus current tabbable date

			setTimeout(() => {
				this.calendar()?.focusTabbableDate();
			});
		}
	}

	arrowDown(popoverRef: PopoverDirective) {
		if (this.isFilterPill) {
			this.calendar()?.focusTabbableDate();
		} else {
			if (popoverRef.opened()) {
				this.calendar()?.focusTabbableDate();
			} else {
				this.openPopover(popoverRef);
			}
		}
	}

	spaceDown(event: Event, popoverRef: PopoverDirective) {
		if (this.userTextInput()?.length === 0) {
			event.preventDefault();
			this.openPopover(popoverRef);
		}
	}

	validate(control: AbstractControl<Date | string | null>): Partial<DateInputValidatorErrorType> | null {
		// null is not an error but means we'll skip everything else, we'll let the presence of a
		// Validators.required (or not) decide if it's an error.
		if (control.value === null || control.value === undefined) {
			return null;
		}
		const date = transformDateInputToDate(control.value);
		// try to parse the display value cause formControl.value is undefined if date is not parsable
		try {
			parse(this.displayValue(), this.dateFormat, startOfDay(new Date()));
		} catch {
			/* not a correct date */
			return { date: true };
		}
		// Check date validity
		if (!this.isValidDate(date)) {
			return { date: true };
		}
		// Check min and max
		if (this.min() && !this.isAfterMin(date, this.mode())) {
			return { min: true };
		} else if (this.max() && !this.isBeforeMax(date, this.mode())) {
			return { max: true };
		}
		// Everything is valid
		return null;
	}

	writeValue(date: Date | string | null): void {
		if (this.#ngControl instanceof NgModel && isNil(this.#onChange)) {
			// avoid phantom call for ngModel
			// https://github.com/angular/angular/issues/14988#issuecomment-1310420293
			return;
		}

		const _date = transformDateInputToDate(date);

		if (this.initialValue() === undefined) {
			this.initialValue.set(_date);
		}

		if (date != null) {
			const start = startOfDay(_date);
			this.dateFromWriteValue.set(start);
			this.selectedDate.set(start);
			this.currentDate.set(start);
		} else {
			this.reset();
		}
	}

	registerOnChange(fn: (value: Date | string | null) => void): void {
		this.#onChange = (date: Date | null) => {
			fn(date && this.inDateISOFormat() && this.isValidDate(date) ? transformDateToDateISO(date) : date);
		};
	}

	override setDisabledState(isDisabled: boolean) {
		this.filterPillDisabled.set(isDisabled);
		super.setDisabledState(isDisabled);
	}

	reset(): Date | null {
		const newValue = this.clearBehavior() === 'reset' ? this.initialValue() : null;
		this.dateFromWriteValue.set(newValue);
		this.selectedDate.set(newValue);
		return newValue;
	}

	clear() {
		const newValue = this.reset();
		this.#onChange?.(newValue);
		this.onTouched?.();
	}

	currentDateChangeFromCalendar(date: Date): void {
		this.tabbableDate.set(date);
		this.currentDate.set(date);
	}

	dateClicked(date: Date, popoverRef: PopoverDirective): void {
		this.selectedDate.set(date);
		this.currentDate.set(date);
		this.tabbableDate.set(date);
		if (!this.isFilterPill) {
			popoverRef.close();
			this.inputRef().nativeElement.focus();
		}
		this.filterPillPopoverCloseFn?.();
	}
}
