import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, LOCALE_ID, model, OnInit, output, viewChildren, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import {
	addHours,
	addMonths,
	addYears,
	eachDayOfInterval,
	eachMonthOfInterval,
	eachYearOfInterval,
	endOfDay,
	endOfDecade,
	endOfMonth,
	endOfWeek,
	endOfYear,
	isAfter,
	isSameDay,
	isSameMonth,
	isSameYear,
	isWithinInterval,
	lastDayOfMonth,
	startOfDay,
	startOfDecade,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subMonths,
	subYears,
	WeekOptions,
} from 'date-fns';
import type { Interval } from 'date-fns';
import { WEEK_INFO } from '../calendar.token';
import { LU_DATE2_TRANSLATIONS } from '../date2.translate';
import { RepeatTimesDirective } from '../repeat-times.directive';
import { comparePeriods, getIntlWeekDay, getJSFirstDayOfWeek } from '../utils';
import { CalendarCellInfo, CalendarMonthInfo, CalendarYearInfo } from './calendar-cell-info';
import { CalendarMode } from './calendar-mode';
import { Calendar2CellDirective } from './calendar2-cell.directive';
import { CALENDAR_CELLS, CALENDAR_TABBABLE_DATE } from './calendar2.tokens';
import { CellStatus } from './cell-status';
import { DateRange } from './date-range';

const MODE_HIERARCHY: CalendarMode[] = ['day', 'month', 'year'];

@Component({
	selector: 'lu-calendar2',
	standalone: true,
	imports: [RepeatTimesDirective, Calendar2CellDirective, LuTooltipTriggerDirective],
	templateUrl: './calendar2.component.html',
	styleUrl: './calendar2.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: CALENDAR_CELLS,
			useFactory: () => inject(Calendar2Component).calendar2CellInstances,
		},
		{
			provide: CALENDAR_TABBABLE_DATE,
			useFactory: () => inject(Calendar2Component).tabbableDate,
		},
	],
})
export class Calendar2Component implements OnInit {
	#locale = inject(LOCALE_ID);
	#weekInfo = inject(WEEK_INFO);
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#intlDateFormat = new Intl.DateTimeFormat(this.#locale, { month: 'long' });
	#intlDateYear = new Intl.DateTimeFormat(this.#locale, { year: 'numeric' });

	#intlDaysLong = new Intl.DateTimeFormat(this.#locale, { weekday: 'long' });
	#intlDaysShort = new Intl.DateTimeFormat(this.#locale, { weekday: 'short' });
	#intlRelativeDay = new Intl.RelativeTimeFormat(this.#locale, { numeric: 'auto' });

	#intlMonthsLong = new Intl.DateTimeFormat(this.#locale, { month: 'long' });
	#intlMonthsShort = new Intl.DateTimeFormat(this.#locale, { month: 'short' });

	#weekOptions: WeekOptions = { weekStartsOn: getJSFirstDayOfWeek(this.#weekInfo) };

	intl = getIntl(LU_DATE2_TRANSLATIONS);

	showOverflow = input(false, { transform: booleanAttribute });

	enableOverflow = input(false, { transform: booleanAttribute });

	removeYearOverflow = input(false, { transform: booleanAttribute });

	hideToday = input(false, { transform: booleanAttribute });

	hasTodayButton = input(false, { transform: booleanAttribute });

	hideWeekend = input(false, { transform: booleanAttribute });

	disableModeChange = input(false, { transform: booleanAttribute });

	// Date used to init the component and as internal focus model
	date = model.required<Date>();

	tabbableDate = model<Date | null>(null);

	mode = model<CalendarMode>('day');

	displayMode = model<CalendarMode | null>(null);

	ranges = input<readonly DateRange[]>([]);

	getCellInfo = input<(date: Date, displayMode: CalendarMode) => CellStatus>((_date: Date) => ({
		classes: [],
		disabled: false,
	}));

	month = computed(() => startOfMonth(this.date()));

	year = computed(() => startOfYear(this.date()));

	decade = computed(() => startOfDecade(this.date()));

	previousMonth = computed(() => subMonths(this.month(), 1));

	nextMonth = computed(() => addMonths(this.month(), 1));

	nextPage = output();

	previousPage = output();

	dateClicked = output<Date>();

	dateHovered = model<Date | null>(null);

	todayLabel = this.#intlRelativeDay.format(0, 'day');
	thisMonthLabel = this.#intlRelativeDay.format(0, 'month');
	thisYearLabel = this.#intlRelativeDay.format(0, 'year');

	calendar2CellInstances = viewChildren(Calendar2CellDirective);

	daysOfWeek = eachDayOfInterval({
		start: startOfWeek(new Date(), this.#weekOptions),
		end: endOfWeek(new Date(), this.#weekOptions),
	}).map((day) => ({
		long: this.#intlDaysLong.format(day),
		short: this.#intlDaysShort.format(day),
	}));

	monthGridDisplay = computed(() => {
		const daysOfMonth: CalendarCellInfo[] = eachDayOfInterval({
			start: this.month(),
			end: endOfMonth(this.month()),
		}).map((date) => this.dateToCellInfo(date));
		const daysByWeek = daysOfMonth.reduce<Record<number, CalendarCellInfo[]>>((acc, day) => {
			const key = startOfWeek(day.date, this.#weekOptions).getTime();
			return {
				...acc,
				[key]: [...(acc[key] || []), day],
			};
		}, {});
		// If we want to show days before and after this month
		// Use last week of previous month
		const startOfPreviousOverflow = startOfWeek(lastDayOfMonth(this.previousMonth()), this.#weekOptions);
		const previousOverflow = eachDayOfInterval({
			start: startOfPreviousOverflow,
			end: endOfMonth(this.previousMonth()),
		}).map((date) => {
			if (this.showOverflow()) {
				return this.dateToCellInfo(date, true);
			} else {
				return this.dateToCellInfo(endOfMonth(date), true);
			}
		});
		if (daysByWeek[startOfPreviousOverflow.getTime()]) {
			daysByWeek[startOfPreviousOverflow.getTime()] = [...previousOverflow, ...daysByWeek[startOfPreviousOverflow.getTime()]];
		}
		// Use first week of next month
		const startOfNextMonthOverflow = startOfWeek(startOfMonth(this.nextMonth()), this.#weekOptions);
		const endOfNextMonthOverflow = endOfWeek(startOfMonth(this.nextMonth()), this.#weekOptions);
		const nextOverflow = eachDayOfInterval({
			start: startOfMonth(this.nextMonth()),
			end: endOfNextMonthOverflow,
		}).map((date) => {
			if (this.showOverflow()) {
				return this.dateToCellInfo(date, true);
			} else {
				return this.dateToCellInfo(startOfMonth(date), true);
			}
		});
		if (daysByWeek[startOfNextMonthOverflow.getTime()]) {
			daysByWeek[startOfNextMonthOverflow.getTime()] = [...daysByWeek[startOfNextMonthOverflow.getTime()], ...nextOverflow];
		}
		return Object.keys(daysByWeek)
			.sort()
			.map((weekStart) => daysByWeek[+weekStart]);
	});

	yearGridDisplay = computed(() => {
		const monthsOfYear: Date[] = eachMonthOfInterval({
			start: this.year(),
			end: endOfYear(this.year()),
		});
		return monthsOfYear
			.map((month) => {
				return {
					date: month,
					short: this.#intlMonthsShort.format(month),
					long: this.#intlMonthsLong.format(month),
					...this.dateToCellInfo(month),
					isCurrent: isSameMonth(new Date(), month),
				} as CalendarMonthInfo;
			})
			.reduce<CalendarMonthInfo[][]>((all, one, i) => {
				const ch = Math.floor(i / 3);
				all[ch] = [...(all[ch] || []), one];
				return all;
			}, []);
	});

	decadeGridDisplay = computed(() => {
		const yearsOfDecade: Date[] = eachYearOfInterval({
			start: this.removeYearOverflow() ? this.decade() : subYears(this.decade(), 1),
			end: this.removeYearOverflow() ? endOfDecade(this.decade()) : addYears(endOfDecade(this.decade()), 1),
		});
		return yearsOfDecade
			.map((year) => {
				return {
					date: year,
					...this.dateToCellInfo(year),
					name: this.#intlDateYear.format(year),
					isCurrent: isSameYear(new Date(), year),
				};
			})
			.reduce<CalendarYearInfo[][]>((all, one, i) => {
				const ch = Math.floor(i / 3);
				all[ch] = [...(all[ch] || []), one];
				return all;
			}, []);
	});

	currentMonthLabel = computed(() => {
		return this.#intlDateFormat.format(this.date());
	});

	currentYearLabel = computed(() => {
		return this.#intlDateYear.format(this.date());
	});

	currentDecadeLabel = computed(() => {
		return `${this.#intlDateYear.format(startOfDecade(this.decade()))} – ${this.#intlDateYear.format(endOfDecade(this.decade()))}`;
	});

	constructor() {
		effect(() => {
			if (this.tabbableDate() === null) {
				this.tabbableDate.set(this.date());
			}
		});
	}

	focusTabbableDate(): void {
		this.calendar2CellInstances()
			.find((cell) => cell.isTabbableDate())
			?.focus();
	}

	blurTabbableDate(): void {
		this.calendar2CellInstances()
			.find((cell) => cell.isTabbableDate())
			?.blur();
	}

	clickToday() {
		this.onCellClicked(startOfDay(new Date()));
	}

	ngOnInit(): void {
		// On init, set display mode to the mode specified by component consumer
		if (this.displayMode() === null) {
			this.displayMode.set(this.mode());
		}
	}

	onCellClicked(date: Date): void {
		// On cell clicked, if display mode is same as mode, emit value
		// Else, zoom in to new mode
		if (this.displayMode() === this.mode()) {
			this.dateClicked.emit(date);
		} else {
			// Check that we are able to zoom in
			const maxZoomLevel = MODE_HIERARCHY.indexOf(this.mode());
			const currentZoomLevel = MODE_HIERARCHY.indexOf(this.displayMode());
			const targetZoomLevel = currentZoomLevel - 1;
			if (targetZoomLevel >= 0 && targetZoomLevel >= maxZoomLevel) {
				const newZoomLevel = MODE_HIERARCHY[targetZoomLevel];
				switch (newZoomLevel) {
					case 'year':
						this.date.set(startOfDecade(date));
						break;
					case 'month':
						this.date.set(startOfYear(date));
						break;
					case 'day':
						this.date.set(startOfMonth(date));
				}
				this.displayMode.set(newZoomLevel);
			}
		}
	}

	dateToCellInfo(date: Date, isOverflow = false): CalendarCellInfo {
		// This method is quite complex and packs a lot of logic, let's try to decompose and explain it.

		// First of all get cell status from the input, if the consumer needs to apply specific statuses to it
		const status = this.getCellInfo()(date, this.displayMode());

		// We need to store a boolean for day mode, because some logic is specific to day display (like weekends for instance)
		const isDayMode = this.displayMode() === 'day';

		// Keeping consumer's classes aside
		const classes: string[] = status?.classes || [];

		// Let's grab the ranges in which this date is in, which includes the "in progress" one if it exists, using the current hovered date
		const rangeInfo = this.getRangeInfo(date, this.displayMode(), isOverflow);

		// If the range includes classes, add them to our display classes
		if (rangeInfo?.class) {
			classes.push(rangeInfo.class);
		}

		// Day specific logic
		// Is it weekend day? for is-dayOff class toggle
		const isWeekend = isDayMode && this.#weekInfo.weekend.includes(getIntlWeekDay(date)) && !this.hideWeekend();
		// Is it first day of month? Mostly used for overflow display logic
		const isFirstDayOfMonth = isDayMode && isSameDay(startOfMonth(date), rangeInfo?.range.start);

		// Is this the current period? Will match if same day as today, or same month in month display, or same year if year display
		const isCurrent = comparePeriods(this.displayMode(), new Date(), date) && !this.hideToday();

		// Are we currently in a range that's being created (start date selected, end date is being hovered)
		const isInProgress = rangeInfo?.range && !rangeInfo.range.end && this.dateHovered() !== null;

		// Progress flags
		let isProgressBody = false;
		let isProgressStart = !!rangeInfo?.range && !rangeInfo.range.end && this.dateHovered() === null;
		let isProgressEnd = !!rangeInfo?.range && !rangeInfo.range.end && this.dateHovered() === null;
		// Specific case for when start is == end and we're hovering it
		let isSingleDayInProgress = false;

		if (isInProgress) {
			let start = rangeInfo?.range.start;
			// If we're in day mode, depending on if first day of month or not, we want to consider the start or the end of the day,
			// To make sure we don't conflict with overflow
			if (isDayMode) {
				start = isFirstDayOfMonth ? endOfDay(rangeInfo.range.start) : startOfDay(rangeInfo.range.start);
			}
			const hoveredRange: Interval = {
				start,
				end: startOfDay(this.dateHovered()),
			};

			// If start is after end, fix this by inverting the two, we always want to work with start before end
			if (isAfter(hoveredRange.start, hoveredRange.end)) {
				let newStart = hoveredRange.end;
				const newStartIsFirstDayOfMonth = isSameDay(startOfMonth(hoveredRange.end), hoveredRange.end);
				if (isDayMode) {
					newStart = newStartIsFirstDayOfMonth ? endOfDay(hoveredRange.end) : startOfDay(hoveredRange.end);
				}
				hoveredRange.end = rangeInfo.range.start;
				hoveredRange.start = newStart;
			}

			// if we're working on overflow for after the last day of a month, we want to use end of day as comparison date
			const isEndOfMonthOverflow = isOverflow && isSameDay(date, startOfMonth(date));

			if (isEndOfMonthOverflow) {
				hoveredRange.end = endOfDay(hoveredRange.end);
			}
			// We're progress body if middle of day is in the current range
			isProgressBody = isWithinInterval(addHours(startOfDay(date), 12), hoveredRange);
			// Overflow cannot be start status for CSS, same for end
			isProgressStart = !isOverflow && comparePeriods(this.displayMode(), date, hoveredRange.start as Date);
			isProgressEnd = !isOverflow && comparePeriods(this.displayMode(), date, hoveredRange.end as Date);

			// This is the case where you clicked a first date and then are hovering it, which requires a specific case for CSS
			if (isSameDay(rangeInfo.range.start, this.dateHovered())) {
				isSingleDayInProgress = !isOverflow && isSameDay(hoveredRange.start, hoveredRange.end) && isSameDay(hoveredRange.start, this.dateHovered());
			}
		}

		const isSelected = status.selected || (!!rangeInfo?.range && !isInProgress);

		return {
			day: date.getDate(),
			status,
			label: status.label || rangeInfo?.label,
			date,
			rangeInfo,
			isWeekend,
			isCurrent,
			isOverflow,
			isSelected,
			noButton: isOverflow && !this.showOverflow(),
			disabled: status?.disabled || (isOverflow && !this.enableOverflow()),
			// Compile everything into a list of classes for CSS
			classes: {
				'is-daysOff': isWeekend,
				'is-overflow': isOverflow,
				'is-current': isCurrent,
				'is-start': !isOverflow && (rangeInfo?.isStart || status.selected) && !isInProgress,
				'is-end': !isOverflow && (rangeInfo?.isEnd || status.selected) && !isInProgress,
				'is-selected': isSelected,
				// Range in progress statuses
				'is-selectionInProgress': isProgressBody,
				'is-startInProgress': isProgressStart,
				'is-endInProgress': isProgressEnd,
				'is-singleDayInProgress': isSingleDayInProgress,

				...classes.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
			},
		};
	}

	getRangeInfo(date: Date, scope: CalendarMode, isOverflow = false) {
		const range: DateRange | undefined = this.ranges().find((range: DateRange) => {
			const isSameScope = (range.scope || 'day') === scope;
			if (isSameScope) {
				if (range.end) {
					return isWithinInterval(date, {
						start: isOverflow ? endOfDay(range.start) : startOfDay(range.start),
						end: isOverflow ? startOfDay(range.end) : range.end,
					});
				} else if (this.dateHovered() !== null) {
					// Nominal case: end is after start
					if (isAfter(this.dateHovered(), startOfDay(range.start))) {
						return isWithinInterval(date, {
							start: startOfDay(range.start),
							end: endOfDay(this.dateHovered()),
						});
					} else {
						// When user clicked end date first and now wants to select a start date
						return isWithinInterval(date, {
							start: startOfDay(this.dateHovered()),
							end: endOfDay(range.start),
						});
					}
				} else {
					switch (this.mode()) {
						case 'day':
							return isSameDay(date, range.start);
						case 'month':
							return isSameMonth(date, range.start);
						case 'year':
							return isSameYear(date, range.start);
					}
				}
			}
			return false;
		});
		if (!range) {
			return null;
		}

		const isStart: boolean = range && isSameDay(date, range.start);
		const isEnd: boolean = range && range.end && isSameDay(date, range.end);

		return {
			range,
			isStart,
			isEnd,
			label: range?.label,
			class: range?.class,
		};
	}
}
