import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, Input, input, LOCALE_ID, model, output, signal, viewChildren, ViewEncapsulation } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek, WeekOptions } from 'date-fns';
import { ButtonComponent } from '../../button/button.component';
import { firstToUpper } from '../../core/tools/first-to-upper';
import { WEEK_INFO } from '../calendar.token';
import { RepeatTimesDirective } from '../repeat-times.directive';
import { getIntlWeekDay, getJSFirstDayOfWeek } from '../utils';
import { CalendarDayInfo } from './calendar-day-info';
import { Calendar2DayDirective } from './calendar2-day.directive';
import { CALENDAR_DAYS } from './calendar2.tokens';
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

	#intlDateFormat = new Intl.DateTimeFormat(this.#locale, { month: 'long', year: 'numeric' });

	#intlDaysLong = new Intl.DateTimeFormat(this.#locale, { weekday: 'long' });
	#intlDaysShort = new Intl.DateTimeFormat(this.#locale, { weekday: 'short' });

	#weekOptions: WeekOptions = { weekStartsOn: getJSFirstDayOfWeek(this.#weekInfo) };

	focusMonth = model(new Date());

	dateClicked = output<Date>();

	nextMonth = output<void>();

	previousMonth = output<void>();

	calendar2DayInstances = viewChildren(Calendar2DayDirective);

	daysOfWeek = eachDayOfInterval({
		start: startOfWeek(new Date(), this.#weekOptions),
		end: endOfWeek(new Date(), this.#weekOptions),
	}).map((day) => ({
		long: firstToUpper(this.#intlDaysLong.format(day)),
		short: firstToUpper(this.#intlDaysShort.format(day)),
	}));

	currentMonth = signal(startOfMonth(this.focusMonth()));

	getDayInfo = input<(day: Date) => DayStatus>((_day: Date) => ({
		classes: [],
		disabled: false,
	}));
	monthGridDisplay = computed(() => {
		const daysOfMonth: CalendarDayInfo[] = eachDayOfInterval({
			start: this.currentMonth(),
			end: endOfMonth(this.currentMonth()),
		}).map((date) => {
			return {
				day: date.getDate(),
				isWeekend: this.#weekInfo.weekend.includes(getIntlWeekDay(date)),
				status: this.getDayInfo()(date),
				date,
			};
		});
		const daysByWeek = daysOfMonth.reduce<Record<number, CalendarDayInfo[]>>((acc, day) => {
			const key = startOfWeek(day.date, this.#weekOptions).getTime();
			return {
				...acc,
				[key]: [...(acc[key] || []), day],
			};
		}, {});

		return Object.keys(daysByWeek)
			.sort()
			.map((weekStart) => daysByWeek[+weekStart]);
	});

	currentMonthLabel = computed(() => {
		return firstToUpper(this.#intlDateFormat.format(this.currentMonth()));
	});

	@Input({ transform: booleanAttribute })
	daysOffHidden = false;

	@Input({ transform: booleanAttribute })
	daysOverflowingHidden = true;
}
