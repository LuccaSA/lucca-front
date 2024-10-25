import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setDate } from 'date-fns';
import { DateRange } from 'packages/ng/date2/calendar2/date-range';

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
			template: `<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [ranges]="ranges" [date]="currentMonth" mode="day" (dateClicked)="selected($event)"></lu-calendar2>`,
		};
	},
} as Meta;

export const SelectRange: StoryObj<Calendar2Component> = {};
