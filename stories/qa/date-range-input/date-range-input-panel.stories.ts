import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { Calendar2Component, CalendarShortcut, CellStatus, DateRange } from '@lucca-front/ng/date2';
import { applicationConfig, Meta } from '@storybook/angular-vite';
import { endOfMonth, endOfYear, isSameDay, startOfMonth, startOfYear } from 'date-fns';

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
		{ label: 'This month', range: { start: startOfMonth(this.leftDate), end: endOfMonth(this.leftDate) } },
		{ label: 'This year', range: { start: startOfYear(this.leftDate), end: endOfYear(this.leftDate) } },
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
