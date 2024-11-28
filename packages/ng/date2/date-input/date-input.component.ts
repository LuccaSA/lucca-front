import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { LuClass, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillDisplayerDirective, FilterPillInputComponent } from '@lucca-front/ng/filter-pills';
import { InputDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { parse, startOfDay } from 'date-fns';
import { AbstractDateComponent } from '../abstract-date-component';
import { CalendarMode } from '../calendar2/calendar-mode';
import { Calendar2Component } from '../calendar2/calendar2.component';
import { CellStatus } from '../calendar2/cell-status';
import { comparePeriods, startOfPeriod } from '../utils';

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
	],
})
export class DateInputComponent extends AbstractDateComponent implements ControlValueAccessor, Validator, FilterPillInputComponent {
	// CVA stuff
	#onChange?: (value: Date) => void;

	#luClass = inject(LuClass);

	placeholder = input<string>();

	enableOverflow = input<boolean>(true);
	showOverflow = input<boolean>(true);

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
		return this.userTextInput();
	});

	userTextInput = signal<string>('');

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

	isFilterPill = false;

	isFilterPillEmpty = signal(true);

	filterPillPopoverCloseFn?: () => void;

	get isNavigationButtonFocused(): boolean {
		return [this.previousButton()?.nativeElement, this.nextButton()?.nativeElement].includes(document.activeElement);
	}

	constructor() {
		super();
		effect(
			() => {
				const inputValue = this.userTextInput();
				if (inputValue.length > 0) {
					const parsed = parse(inputValue, this.dateFormat, startOfDay(new Date()));
					if (parsed.getFullYear() > 999) {
						this.selectedDate.set(startOfDay(parsed));
						this.currentDate.set(startOfDay(parsed));
					} else if (!this.isFilterPill) {
						this.selectedDate.set(parsed);
					}
				}
			},
			{ allowSignalWrites: true },
		);
		effect(
			() => {
				this.#onChange?.(this.selectedDate());
				this.isFilterPillEmpty.set(!this.selectedDate());
			},
			{ allowSignalWrites: true },
		);

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

	registerFilterPillClosePopover(closeFn: () => void): void {
		this.filterPillPopoverCloseFn = closeFn;
	}

	enableFilterPillMode(): void {
		this.isFilterPill = true;
	}

	clearFilterPillValue(): void {
		this.clear();
	}

	getDefaultFilterPillIcon(): LuccaIcon {
		return 'calendarDate';
	}

	arrowDown(event: Event, popoverRef: PopoverDirective) {
		if (this.isFilterPill) {
			this.calendar()?.focusTabbableDate();
		} else {
			if (popoverRef.opened()) {
				popoverRef.focusBackToContent(event);
			} else {
				this.openPopover(popoverRef);
			}
		}
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

	validate(control: AbstractControl<Date, Date>): ValidationErrors {
		return this.isValidDate(control.value) ? null : { date: true };
	}

	writeValue(date: Date): void {
		if (date) {
			this.selectedDate.set(startOfDay(date));
			this.currentDate.set(startOfDay(date));
		}
	}

	registerOnChange(fn: (value: Date) => void): void {
		this.#onChange = fn;
	}

	clear() {
		this.inputRef().nativeElement.value = '';
		this.selectedDate.set(null);
		this.onTouched?.();
	}

	currentDateChangeFromCalendar(date: Date): void {
		this.tabbableDate.set(date);
		this.currentDate.set(date);
	}

	dateClicked(date: Date, popoverRef: PopoverDirective): void {
		this.selectedDate.set(date);
		this.currentDate.set(date);
		if (!this.isFilterPill) {
			popoverRef.close();
			this.inputRef().nativeElement.focus();
		}
		this.filterPillPopoverCloseFn?.();
	}
}
