import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { Calendar2Component, CalendarShortcut, CellStatus, DateRange } from '@lucca-front/ng/date2';
import { applicationConfig, Meta } from '@storybook/angular-vite';
import {
	endOfDecade,
	endOfMonth,
	endOfQuarter,
	endOfWeek,
	endOfYear,
	isSameDay,
	startOfDecade,
	startOfMonth,
	startOfQuarter,
	startOfWeek,
	startOfYear,
	subDays,
	subMonths,
	subQuarters,
	subWeeks,
	subYears,
} from 'date-fns';

@Component({
	selector: 'date-range-input-panel-stories',
	templateUrl: './date-range-input-panel.stories.html',
	imports: [Calendar2Component],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DateRangeInputPanelStory {
	leftDate = new Date(2024, 8, 16);
	rightDate = new Date(2024, 9, 16);

	leftDateMonth = new Date(2024, 8, 16);
	rightDateMonth = new Date(2025, 8, 16);

	leftDateYear = new Date(2004, 8, 16);
	rightDateYear = new Date(2014, 8, 16);

	minDate = new Date(2024, 8, 10);
	maxDate = new Date(2024, 8, 22);

	minMaxCellInfo = (date: Date): CellStatus => ({
		classes: [],
		disabled: date < this.minDate || date > this.maxDate,
	});

	fullRange: DateRange = { start: new Date(2024, 8, 16), end: new Date(2024, 9, 4) };

	currentCellInfo = (date: Date): CellStatus => ({
		classes: isSameDay(date, this.leftDate) ? ['is-current'] : [],
	});

	monthRange: DateRange = { start: new Date(2024, 8, 16), end: new Date(2024, 10, 20), scope: 'month' };
	yearRange: DateRange = { start: new Date(2004, 0, 1), end: new Date(2007, 0, 1), scope: 'year' };

	shortcuts: CalendarShortcut[] = [
		{ label: 'This week', range: { start: startOfWeek(this.leftDate), end: endOfWeek(this.leftDate) } },
		{ label: 'Last week', range: { start: startOfWeek(subWeeks(this.leftDate, 1)), end: endOfWeek(subWeeks(this.leftDate, 1)) } },
		{ label: 'This month', range: { start: startOfMonth(this.leftDate), end: endOfMonth(this.leftDate) } },
		{ label: 'Last month', range: { start: startOfMonth(subMonths(this.leftDate, 1)), end: endOfMonth(subMonths(this.leftDate, 1)) } },
		{ label: 'This quarter', range: { start: startOfQuarter(this.leftDate), end: endOfQuarter(this.leftDate) } },
		{ label: 'Last quarter', range: { start: startOfQuarter(subQuarters(this.leftDate, 1)), end: endOfQuarter(subQuarters(this.leftDate, 1)) } },
		{ label: 'This year', range: { start: startOfYear(this.leftDate), end: endOfYear(this.leftDate) } },
		{ label: 'Last year', range: { start: startOfYear(subYears(this.leftDate, 1)), end: endOfYear(subYears(this.leftDate, 1)) } },
		{ label: 'Last 7 days', range: { start: subDays(this.leftDate, 7), end: this.leftDate } },
		{ label: 'Last 30 days', range: { start: subDays(this.leftDate, 30), end: this.leftDate } },
		{ label: 'Last 90 days', range: { start: subDays(this.leftDate, 90), end: this.leftDate } },
		{ label: 'Last 12 months', range: { start: subMonths(this.leftDate, 12), end: this.leftDate } },
	];

	// `.calendarShortcuts` has a different max-block-size for `mod-month`/`mod-year` than for
	// `mod-day` (18rem, no `:has(.calendar-todayLink)` bonus) — worth its own QA row. Long list
	// (more than the panel's max height) to show the scroll on this row too.
	monthShortcuts: CalendarShortcut[] = [
		{ label: 'This year', range: { start: startOfYear(this.leftDateMonth), end: endOfYear(this.leftDateMonth), scope: 'month' } },
		{ label: 'Last year', range: { start: startOfYear(subYears(this.leftDateMonth, 1)), end: endOfYear(subYears(this.leftDateMonth, 1)), scope: 'month' } },
		{ label: 'Last 6 months', range: { start: subMonths(this.leftDateMonth, 6), end: this.leftDateMonth, scope: 'month' } },
		{ label: 'Last 12 months', range: { start: subMonths(this.leftDateMonth, 12), end: this.leftDateMonth, scope: 'month' } },
		{ label: 'Last 18 months', range: { start: subMonths(this.leftDateMonth, 18), end: this.leftDateMonth, scope: 'month' } },
		{ label: 'Last 24 months', range: { start: subMonths(this.leftDateMonth, 24), end: this.leftDateMonth, scope: 'month' } },
		{ label: 'Last 5 years', range: { start: subYears(this.leftDateMonth, 5), end: this.leftDateMonth, scope: 'month' } },
		{ label: 'This decade', range: { start: startOfDecade(this.leftDateMonth), end: endOfDecade(this.leftDateMonth), scope: 'month' } },
		{
			label: 'Last decade',
			range: { start: startOfDecade(subYears(this.leftDateMonth, 10)), end: endOfDecade(subYears(this.leftDateMonth, 10)), scope: 'month' },
		},
	];
}

export default {
	title: 'QA/DateRangeInput/Panel',
	component: DateRangeInputPanelStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic = {};
