import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID, signal, ViewEncapsulation } from '@angular/core';
import { eachDayOfInterval, endOfMonth, endOfWeek, setDay, startOfMonth, startOfWeek, WeekOptions } from 'date-fns';
import { firstToUpper } from '../../core/tools/first-to-upper';
import { WEEK_INFO } from '../calendar.token';
import { getIntlWeekDay, getJSFirstDayOfWeek } from '../utils';
import { CalendarDayInfo } from './calendar-day-info';
import { RepeatTimesDirective } from '../repeat-times.directive';

@Component({
	selector: 'lu-calendar2',
	standalone: true,
	imports: [RepeatTimesDirective],
	templateUrl: './calendar2.component.html',
	styleUrl: './calendar2.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar2Component {
	#locale = inject(LOCALE_ID);
	#weekInfo = inject(WEEK_INFO);

	#intlDateFormat = new Intl.DateTimeFormat(this.#locale, { month: 'long', year: 'numeric' });

	#intlDaysLong = new Intl.DateTimeFormat(this.#locale, { weekday: 'long' });
	#intlDaysShort = new Intl.DateTimeFormat(this.#locale, { weekday: 'short' });

	#weekOptions: WeekOptions = { weekStartsOn: getJSFirstDayOfWeek(this.#weekInfo) };

	daysOfWeek = eachDayOfInterval({
		start: startOfWeek(new Date(), this.#weekOptions),
		end: endOfWeek(new Date(), this.#weekOptions),
	}).map((day) => ({
		long: firstToUpper(this.#intlDaysLong.format(day)),
		short: firstToUpper(this.#intlDaysShort.format(day)),
	}));

	currentMonth = signal(startOfMonth(new Date()));

	gridDisplay = computed(() => {
		// TODO proper typings
		const daysOfMonth: CalendarDayInfo[] = eachDayOfInterval({
			start: this.currentMonth(),
			end: endOfMonth(this.currentMonth()),
		}).map((date) => {
			return {
				day: date.getDate(),
				isWeekend: this.#weekInfo.weekend.includes(getIntlWeekDay(date)),
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
}
