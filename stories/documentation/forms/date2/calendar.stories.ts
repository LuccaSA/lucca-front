import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setDate } from 'date-fns';
import { DateRange } from 'packages/ng/date2/calendar2/date-range';
import { CalendarMode } from '../../../../packages/ng/date2/calendar2/calendar-mode';

export default {
	title: 'Documentation/Forms/Date2/Calendar',
	decorators: [
		moduleMetadata({
			imports: [Calendar2Component, FormsModule],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {},
	render: (args, { argTypes }) => {
		return {
			props: {
				currentMonth: new Date(),
				selected: (value: Date) => console.log(value),
				getDayInfo: (date: Date, mode: CalendarMode) => {
					if (mode === 'decade' && date.getFullYear() === 2023) {
						return {
							disabled: true,
							classes: [],
						};
					}
					if (mode === 'decade' && date.getFullYear() === 2022) {
						return {
							selected: true,
							classes: [],
						};
					}
					if (mode === 'year' && date.getFullYear() === 2024 && date.getMonth() === 1) {
						return {
							disabled: true,
							classes: [],
						};
					}
					if (mode === 'year' && date.getFullYear() === 2024 && date.getMonth() === 2) {
						return {
							selected: true,
							classes: [],
						};
					}
					return { classes: [] };
				},
				ranges: [
					{
						start: setDate(new Date(), 2),
						end: setDate(new Date(), 8),
						class: 'palette-lavender',
						label: 'RTT',
					},
					{
						start: setDate(new Date(), 10),
						end: setDate(new Date(), 15),
						class: 'palette-watermelon',
					},
					{
						start: setDate(new Date(), 18),
						end: setDate(new Date(), 22),
						class: 'palette-mint',
					},
					{
						start: setDate(new Date(), 26),
						end: setDate(new Date(), 29),
					},
				] as DateRange[],
			},
			styles: [`:host { display: flex; gap: 1rem; align-items: flex-start }`],
			template: `
				<lu-calendar2 [ranges]="ranges" [getCellInfo]="getDayInfo" [date]="currentMonth" mode="month" (dateClicked)="selected($event)"></lu-calendar2>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
