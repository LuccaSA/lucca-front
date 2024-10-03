import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
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
				getDayInfo: (date: Date, mode: CalendarMode) => {
					if (mode === 'month' && date.getDate() === 10 && date.getMonth()) {
						return {
							selected: true,
						};
					}
					if (mode === 'month' && date.getDate() === 17 && date.getMonth()) {
						return {
							disabled: true,
						};
					}
					if (mode === 'month' && date.getDate() === 24 && date.getMonth()) {
						return {
							selected: true,
							classes: ['palette-mint'],
						};
					}
					return { classes: [] };
				},
			},
			template: `
				<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [getCellInfo]="getDayInfo" [date]="currentMonth" mode="month" (dateClicked)="selected($event)"></lu-calendar2>
			`,
		};
	},
} as Meta;

export const SelectDay: StoryObj<Calendar2Component> = {};
