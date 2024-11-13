import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, LOCALE_ID, model, OnInit, output, viewChildren, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
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
import type { Interval } from 'date-fns/types';
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
	imports: [RepeatTimesDirective, ButtonComponent, Calendar2CellDirective, NgClass, CalloutComponent, LuTooltipTriggerDirective],
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

	showOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });

	enableOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });

	hideToday = input<boolean, boolean>(false, { transform: booleanAttribute });

	hasTodayButton = input<boolean, boolean>(false, { transform: booleanAttribute });

	hideWeekend = input<boolean, boolean>(false, { transform: booleanAttribute });

	disableModeChange = input<boolean, boolean>(false, { transform: booleanAttribute });

	// Date used to init the component and as internal focus model
	date = model.required<Date>();

	tabbableDate = model<Date | null>(null);

	mode = model<CalendarMode>('day');

	displayMode = model<CalendarMode>('year');

	ranges = input<DateRange[]>([]);

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
			start: subYears(this.decade(), 1),
			end: addYears(endOfDecade(this.decade()), 1),
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
		// eslint-disable-next-line no-irregular-whitespace
		return `${this.#intlDateYear.format(startOfDecade(this.decade()))} – ${this.#intlDateYear.format(endOfDecade(this.decade()))}`;
	});

	constructor() {
		effect(
			() => {
				if (this.tabbableDate() === null) {
					this.tabbableDate.set(this.date());
				}
			},
			{ allowSignalWrites: true },
		);
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
		this.displayMode.set(this.mode());
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
		const status = this.getCellInfo()(date, this.displayMode());

		const isDayMode = this.displayMode() === 'day';

		const classes: string[] = status?.classes || [];

		const rangeInfo = this.getRangeInfo(date, this.displayMode());

		if (rangeInfo?.class) {
			classes.push(rangeInfo.class);
		}

		const isWeekend = isDayMode && this.#weekInfo.weekend.includes(getIntlWeekDay(date)) && !this.hideWeekend();
		const isFirstDayOfMonth = isDayMode && isSameDay(startOfMonth(date), rangeInfo?.range.start);

		const isCurrent = comparePeriods(this.displayMode(), new Date(), date) && !this.hideToday();

		const isInProgress = rangeInfo?.range && !rangeInfo.range.end && this.dateHovered() !== null;

		let isProgressBody = false;
		let isProgressStart = !!rangeInfo?.range && !rangeInfo.range.end && this.dateHovered() === null;
		let isProgressEnd = !!rangeInfo?.range && !rangeInfo.range.end && this.dateHovered() === null;
		let isSingleDayInProgress = false;

		if (isInProgress) {
			let start = rangeInfo?.range.start;
			if (isDayMode) {
				start = isFirstDayOfMonth ? endOfDay(rangeInfo.range.start) : startOfDay(rangeInfo.range.start);
			}
			const hoveredRange: Interval = {
				start,
				end: startOfDay(this.dateHovered()),
			};

			if (isAfter(hoveredRange.start, hoveredRange.end)) {
				let newStart = hoveredRange.end;
				if (isDayMode) {
					newStart = isFirstDayOfMonth ? endOfDay(hoveredRange.end) : startOfDay(hoveredRange.end);
				}
				hoveredRange.end = rangeInfo.range.start;
				hoveredRange.start = newStart;
			}

			const isEndOfMonthOverflow = isOverflow && isSameDay(date, startOfMonth(date));

			if (isEndOfMonthOverflow) {
				hoveredRange.end = endOfDay(hoveredRange.end);
			}

			isProgressBody = isWithinInterval(addHours(startOfDay(date), 12), hoveredRange);
			isProgressStart = !isOverflow && comparePeriods(this.displayMode(), date, hoveredRange.start as Date);
			isProgressEnd = !isOverflow && comparePeriods(this.displayMode(), date, hoveredRange.end as Date);

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
			ngClasses: {
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

	getRangeInfo(date: Date, scope: CalendarMode) {
		const range: DateRange | undefined = this.ranges().find((range: DateRange) => {
			const isSameScope = (range.scope || 'day') === scope;
			if (isSameScope) {
				if (range.end) {
					return isWithinInterval(date, {
						start: startOfDay(range.start),
						end: range.end,
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

		const isStart: boolean = range && isSameDay(date, range.start) && !range.startsOutside;
		const isEnd: boolean = range && range.end && isSameDay(date, range.end) && !range.endsOutside;

		return {
			range,
			isStart,
			isEnd,
			label: range?.label,
			class: range?.class,
		};
	}
}
