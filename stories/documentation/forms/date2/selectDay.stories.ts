import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component, CalendarMode } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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
				getDayInfo: (date: Date, mode: CalendarMode) => {
					if (mode === 'day' && date.getDate() === 10 && date.getMonth() === new Date().getMonth()) {
						return {
							selected: true,
						};
					}
					if (mode === 'day' && date.getDate() === 17 && date.getMonth() === new Date().getMonth()) {
						return {
							disabled: true,
						};
					}
					if (mode === 'day' && date.getDate() === 2 && date.getMonth() === new Date().getMonth()) {
						return {
							selected: true,
							label: 'I am green',
							classes: ['palette-mint'],
						};
					}
					return { classes: [] };
				},
			},
			template: `
				<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [getCellInfo]="getDayInfo" [date]="currentMonth" mode="day" (dateClicked)="selected($event)" />
			`,
		};
	},
} as Meta;

export const SelectDay: StoryObj<Calendar2Component> = {};
