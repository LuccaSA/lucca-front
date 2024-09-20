import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, LOCALE_ID, output, viewChildren, ViewEncapsulation } from '@angular/core';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, isSameDay, isWithinInterval, lastDayOfMonth, startOfDay, startOfMonth, startOfWeek, subMonths, WeekOptions } from 'date-fns';
import { ButtonComponent } from '../../button/button.component';
import { WEEK_INFO } from '../calendar.token';
import { RepeatTimesDirective } from '../repeat-times.directive';
import { getIntlWeekDay, getJSFirstDayOfWeek } from '../utils';
import { CalendarDayInfo } from './calendar-day-info';
import { Calendar2DayDirective } from './calendar2-day.directive';
import { CALENDAR_DAYS } from './calendar2.tokens';
import { DateRange } from './date-range';
import { DayStatus } from './day-status';

@Component({
	selector: 'lu-calendar2',
	standalone: true,
	imports: [RepeatTimesDirective, ButtonComponent, Calendar2DayDirective, NgClass],
	templateUrl: './calendar2.component.html',
	styleUrl: './calendar2.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: CALENDAR_DAYS,
			useFactory: () => inject(Calendar2Component).calendar2DayInstances,
		},
	],
})
export class Calendar2Component {
	#locale = inject(LOCALE_ID);
	#weekInfo = inject(WEEK_INFO);
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#intlDateFormat = new Intl.DateTimeFormat(this.#locale, { month: 'long', year: 'numeric' });

	#intlDaysLong = new Intl.DateTimeFormat(this.#locale, { weekday: 'long' });
	#intlDaysShort = new Intl.DateTimeFormat(this.#locale, { weekday: 'short' });
	#intlRelativeDay = new Intl.RelativeTimeFormat(this.#locale, { numeric: 'auto' });

	#weekOptions: WeekOptions = { weekStartsOn: getJSFirstDayOfWeek(this.#weekInfo) };

	showOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });

	enableOverflow = input<boolean, boolean>(false, { transform: booleanAttribute });

	hideToday = input<boolean, boolean>(false, { transform: booleanAttribute });

	month = input<Date, Date>(startOfMonth(new Date()), { transform: (date) => startOfMonth(date) });

	ranges = input<DateRange[]>([]);

	getDayInfo = input<(day: Date) => DayStatus>((_day: Date) => ({
		classes: [],
		disabled: false,
	}));

	previousMonth = computed(() => subMonths(this.month(), 1));

	nextMonth = computed(() => addMonths(this.month(), 1));

	dateClicked = output<Date>();

	todayLabel = this.#intlRelativeDay.format(0, 'day');

	calendar2DayInstances = viewChildren(Calendar2DayDirective);

	daysOfWeek = eachDayOfInterval({
		start: startOfWeek(new Date(), this.#weekOptions),
		end: endOfWeek(new Date(), this.#weekOptions),
	}).map((day) => ({
		long: this.#intlDaysLong.format(day),
		short: this.#intlDaysShort.format(day),
	}));

	monthGridDisplay = computed(() => {
		const daysOfMonth: CalendarDayInfo[] = eachDayOfInterval({
			start: this.month(),
			end: endOfMonth(this.month()),
		}).map((date) => this.dateToDayInfo(date));
		const daysByWeek = daysOfMonth.reduce<Record<number, CalendarDayInfo[]>>((acc, day) => {
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
			}).map((date) => this.dateToDayInfo(date, true));
			if (daysByWeek[startOfPreviousOverflow.getTime()]) {
				daysByWeek[startOfPreviousOverflow.getTime()] = [...previousOverflow, ...daysByWeek[startOfPreviousOverflow.getTime()]];
			}
			// Use first week of next month
			const startOfNextMonthOverflow = startOfWeek(startOfMonth(this.nextMonth()), this.#weekOptions);
			const endOfNextMonthOverflow = endOfWeek(startOfMonth(this.nextMonth()), this.#weekOptions);
			const nextOverflow = eachDayOfInterval({
				start: startOfMonth(this.nextMonth()),
				end: endOfNextMonthOverflow,
			}).map((date) => this.dateToDayInfo(date, true));
			if (daysByWeek[startOfNextMonthOverflow.getTime()]) {
				daysByWeek[startOfNextMonthOverflow.getTime()] = [...daysByWeek[startOfNextMonthOverflow.getTime()], ...nextOverflow];
			}
		}
		return Object.keys(daysByWeek)
			.sort()
			.map((weekStart) => daysByWeek[+weekStart]);
	});

	dateToDayInfo(date: Date, isOverflow = false): CalendarDayInfo {
		const range: DateRange | undefined = this.ranges().find((range: DateRange) => {
			return isWithinInterval(date, { start: startOfDay(range.start), end: range.end || endOfMonth(date) });
		});

		const status = this.getDayInfo()(date);

		const isStart: boolean = range && isSameDay(date, range.start);
		const isEnd: boolean = range && range.end && isSameDay(date, range.end);

		// const value: string = range.value;

		const classes: string[] = status?.classes || [];

		if (range?.class) {
			classes.push(range.class);
		}

		return {
			day: date.getDate(),
			isWeekend: this.#weekInfo.weekend.includes(getIntlWeekDay(date)),
			isOverflow,
			status,
			date,
			classes,
			isToday: isSameDay(new Date(), date) && !this.hideToday(),
			rangeInfo: {
				range,
				isStart,
				isEnd,
				label: range?.label,
			},
		};
	}

	currentMonthLabel = computed(() => {
		return this.#intlDateFormat.format(this.month());
	});
}
