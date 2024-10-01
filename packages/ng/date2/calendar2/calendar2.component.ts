import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, LOCALE_ID, model, OnInit, output, viewChildren, ViewEncapsulation } from '@angular/core';
import { CalloutComponent } from '@lucca-front/ng/callout';
import {
	addMonths,
	addYears,
	eachDayOfInterval,
	eachMonthOfInterval,
	eachYearOfInterval,
	endOfDecade,
	endOfMonth,
	endOfWeek,
	endOfYear,
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
import { ButtonComponent } from '@lucca-front/ng/button';
import { WEEK_INFO } from '../calendar.token';
import { RepeatTimesDirective } from '../repeat-times.directive';
import { getIntlWeekDay, getJSFirstDayOfWeek } from '../utils';
import { CalendarCellInfo, CalendarMonthInfo, CalendarYearInfo } from './calendar-cell-info';
import { CalendarMode } from './calendar-mode';
import { Calendar2CellDirective } from './calendar2-cell.directive';
import { CALENDAR_CELLS, CALENDAR_TABBABLE_DATE } from './calendar2.tokens';
import { CellStatus } from './cell-status';
import { DateRange } from './date-range';
import { getIntl } from '../../core/translate';
import { LU_DATE2_TRANSLATIONS } from '../date2.translate';

const MODE_HIERARCHY: CalendarMode[] = ['month', 'year', 'decade'];

@Component({
	selector: 'lu-calendar2',
	standalone: true,
	imports: [RepeatTimesDirective, ButtonComponent, Calendar2CellDirective, NgClass, CalloutComponent],
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

	// Date used to init the component and as internal focus model
	date = model.required<Date>();

	tabbableDate = model<Date | null>(null);

	mode = model<CalendarMode>('month');

	displayMode = model<CalendarMode>('decade');

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
		if (this.showOverflow()) {
			// Use last week of previous month
			const startOfPreviousOverflow = startOfWeek(lastDayOfMonth(this.previousMonth()), this.#weekOptions);
			const previousOverflow = eachDayOfInterval({
				start: startOfPreviousOverflow,
				end: endOfMonth(this.previousMonth()),
			}).map((date) => this.dateToCellInfo(date, true));
			if (daysByWeek[startOfPreviousOverflow.getTime()]) {
				daysByWeek[startOfPreviousOverflow.getTime()] = [...previousOverflow, ...daysByWeek[startOfPreviousOverflow.getTime()]];
			}
			// Use first week of next month
			const startOfNextMonthOverflow = startOfWeek(startOfMonth(this.nextMonth()), this.#weekOptions);
			const endOfNextMonthOverflow = endOfWeek(startOfMonth(this.nextMonth()), this.#weekOptions);
			const nextOverflow = eachDayOfInterval({
				start: startOfMonth(this.nextMonth()),
				end: endOfNextMonthOverflow,
			}).map((date) => this.dateToCellInfo(date, true));
			if (daysByWeek[startOfNextMonthOverflow.getTime()]) {
				daysByWeek[startOfNextMonthOverflow.getTime()] = [...daysByWeek[startOfNextMonthOverflow.getTime()], ...nextOverflow];
			}
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
					isCurrent: isSameMonth(new Date(), month),
					status: this.getCellInfo()(month, this.displayMode()),
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
					label: this.#intlDateYear.format(year),
					isCurrent: isSameYear(new Date(), year),
					status: this.getCellInfo()(year, this.displayMode()),
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
					case 'decade':
						this.date.set(startOfDecade(date));
						break;
					case 'year':
						this.date.set(startOfYear(date));
						break;
					case 'month':
						this.date.set(startOfMonth(date));
				}
				this.displayMode.set(newZoomLevel);
			}
		}
	}

	dateToCellInfo(date: Date, isOverflow = false): CalendarCellInfo {
		const status = this.getCellInfo()(date, this.displayMode());

		const classes: string[] = status?.classes || [];

		const rangeInfo = this.getRangeInfo(date, 'month');

		if (rangeInfo?.class) {
			classes.push(rangeInfo.class);
		}

		return {
			day: date.getDate(),
			isWeekend: this.#weekInfo.weekend.includes(getIntlWeekDay(date)),
			isOverflow,
			status,
			date,
			classes,
			isCurrent: isSameDay(new Date(), date) && !this.hideToday(),
			rangeInfo,
		};
	}

	getRangeInfo(date: Date, scope: CalendarMode) {
		const range: DateRange | undefined = this.ranges().find((range: DateRange) => {
			return (
				(range.scope || 'month') === scope &&
				isWithinInterval(date, {
					start: startOfDay(range.start),
					end: range.end || endOfMonth(date),
				})
			);
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
