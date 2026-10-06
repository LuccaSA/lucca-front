import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { Calendar2Component, CellStatus } from '@lucca-front/ng/date2';
import { applicationConfig, Meta } from '@storybook/angular-vite';
import { addDays, isSameDay, isSameMonth, isSameWeek, isSameYear } from 'date-fns';

@Component({
	selector: 'date-input-panel-stories',
	templateUrl: './date-input-panel.stories.html',
	imports: [Calendar2Component],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DateInputPanelStory {
	referenceDate = new Date(2024, 8, 16);

	yearModeDate = new Date(2004, 8, 16);

	otherDate = addDays(this.referenceDate, 5);

	minDate = new Date(2024, 8, 10);
	maxDate = new Date(2024, 8, 22);

	daySelectedCellInfo = (date: Date): CellStatus => ({
		classes: [],
		selected: isSameDay(date, this.referenceDate),
	});

	weekSelectedCellInfo = (date: Date): CellStatus => ({
		classes: [],
		selected: isSameWeek(date, this.referenceDate),
	});

	monthSelectedCellInfo = (date: Date): CellStatus => ({
		classes: [],
		selected: isSameMonth(date, this.referenceDate),
	});

	yearSelectedCellInfo = (date: Date): CellStatus => ({
		classes: [],
		selected: isSameYear(date, this.yearModeDate),
	});

	currentCellInfo = (date: Date): CellStatus => ({
		classes: isSameDay(date, this.referenceDate) ? ['is-current'] : [],
	});

	currentWithSelectionCellInfo = (date: Date): CellStatus => ({
		classes: isSameDay(date, this.referenceDate) ? ['is-current'] : [],
		selected: isSameDay(date, this.otherDate),
	});

	minMaxCellInfo = (date: Date): CellStatus => ({
		classes: [],
		disabled: date < this.minDate || date > this.maxDate,
	});

	minMaxSelectedCellInfo = (date: Date): CellStatus => ({
		classes: [],
		disabled: date < this.minDate || date > this.maxDate,
		selected: isSameDay(date, this.referenceDate),
	});
}

export default {
	title: 'QA/DateInput/Panel',
	component: DateInputPanelStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic = {};
