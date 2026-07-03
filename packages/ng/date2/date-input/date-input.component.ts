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
	input,
	model,
	signal,
	untracked,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { LuccaIcon } from '@lucca-front/icons';
import { ClearComponent } from '@lucca-front/ng/clear';
import { isNil, isNotNil, LuClass, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective, FilterPillInputComponent } from '@lucca-front/ng/filter-pills';
import { InputDirective, PresentationDisplayDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { isSameDay, parse, startOfDay } from 'date-fns';
import { AbstractDateComponent } from '../abstract-date-component';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { comparePeriods, startOfPeriod } from '../utils';

@Component({
	selector: 'lu-date-input',
	imports: [PopoverDirective, Calendar2Component, IconComponent, InputDirective, NgTemplateOutlet, FilterPillDisplayerDirective, ClearComponent, PresentationDisplayDirective],
	templateUrl: './date-input.component.html',
	styleUrl: './date-input.component.scss',
	host: {
		class: 'dateField',
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => DateInputComponent),
		},
		LuClass,
	],
})
export class DateInputComponent extends AbstractDateComponent implements FormValueControl<Date | null>, FilterPillInputComponent {
	public parentInput = inject(FILTER_PILL_INPUT_COMPONENT, { optional: true, skipSelf: true });

	#luClass = inject(LuClass);

	readonly value = model<Date | null>(null);

	autocomplete = input<AutoFill>('off');

	placeholder = input<string>();

	disableOverflow = input(false, { transform: booleanAttribute });
	hideOverflow = input(false, { transform: booleanAttribute });
	widthAuto = input(false, { transform: booleanAttribute });

	filterPillDisabled = computed(() => this.disabled());

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
		const textInput = this.userTextInput();
		if (textInput !== 'ɵ') {
			const parsedInput = parse(textInput, this.dateFormatWithMode(), startOfDay(new Date()));
			if (this.isValidDate(parsedInput) && this.inputFocused()) {
				return textInput;
			}
		}
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
			const nativeElement = this.inputRef()?.nativeElement;
			if (nativeElement) {
				const cursorPositionBefore = nativeElement.selectionStart ?? 0;
				const displayValue = this.displayValue();
				nativeElement.value = this.displayValue();
				if (displayValue.endsWith(this.separator)) {
					nativeElement.setSelectionRange(cursorPositionBefore + 1, cursorPositionBefore + 1);
				} else {
					nativeElement.setSelectionRange(cursorPositionBefore, cursorPositionBefore);
				}
			}
		});

		effect(() => {
			const inputValue = this.userTextInput();
			// If we are initializing the component, we don't want to parse the value
			if (inputValue === 'ɵ') {
				return;
			}
			if (inputValue.length > 0) {
				let parsed: Date;
				try {
					parsed = parse(inputValue, this.dateFormatWithMode(), startOfDay(new Date()));
				} catch {
					/* not a correct date */
				}
				if (parsed instanceof Date && parsed.getFullYear() > 999) {
					this.selectedDate.set(startOfDay(parsed));
					this.currentDate.set(startOfDay(parsed));
					this.tabbableDate.set(startOfDay(parsed));
				} else if (!this.isFilterPill) {
					this.selectedDate.set(parsed);
				}
			} else {
				this.selectedDate.set(null);
			}
		});

		effect(() => {
			const date = this.value();
			if (untracked(this.initialValue) === undefined) {
				this.initialValue.set(date);
			}
			if (isNotNil(date)) {
				const start = startOfDay(date);
				this.dateFromWriteValue.set(start);
				this.selectedDate.set(start);
				this.currentDate.set(start);
			} else {
				this.reset();
			}
		});

		effect(() => {
			const selectedDate = this.selectedDate();
			if (!this.#safeCompareDate(untracked(this.dateFromWriteValue), selectedDate)) {
				this.value.set(this.isValidDate(selectedDate) ? selectedDate : null);
				this.dateFromWriteValue.set(selectedDate);
			}
		});

		effect(() => {
			this.#luClass.setState({
				'mod-day': this.mode() === 'day',
				'mod-month': this.mode() === 'month',
				'mod-year': this.mode() === 'year',
			});
		});

		ɵeffectWithDeps([this.mode, this.calendarMode], (mode, calendarMode) => {
			if (mode && isNil(calendarMode)) {
				this.calendarMode.set(mode);
			}
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

	#safeCompareDate(a: Date | null, b: Date | null): boolean {
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

	reset(): Date | null {
		const newValue = this.clearBehavior() === 'reset' ? this.initialValue() : null;
		this.dateFromWriteValue.set(newValue);
		this.selectedDate.set(newValue);
		return newValue;
	}

	clear() {
		const newValue = this.reset();
		this.value.set(newValue);
		this.touch.emit();
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
			this.inputRef()?.nativeElement.focus();
		}
		this.filterPillPopoverCloseFn?.();
	}

	inputBlurred(): void {
		this.touch.emit();
		this.inputFocused.set(false);
		this.userTextInput.set('ɵ');
	}
}
