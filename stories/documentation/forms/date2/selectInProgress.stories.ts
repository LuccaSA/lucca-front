import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CalendarMode } from 'packages/ng/date2/calendar2/calendar-mode';

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
				month1: new Date(2024, 7),
				month2: new Date(2024, 8),
				month3: new Date(2024, 9),
				month4: new Date(2024, 10),
				month5: new Date(2024, 11),
				getDayInfo: (date: Date, mode: CalendarMode) => {
					if (mode === 'day' && date.getDate() === 17 && date.getMonth() === 9) {
						return {
							classes: ['is-start'],
						};
					}
					return { classes: [] };
				},
			},
			template: `
				<div class="calendarWrapper mod-range" [attr.style]="'--components-calendarWrapperVisible: 5'">
					<div class="calendarWrapper-content palette-watermelon">
						<lu-calendar2 [date]="month1" [getCellInfo]="getDayInfo" />		
						<lu-calendar2 [date]="month2" [getCellInfo]="getDayInfo" />	
						<lu-calendar2 [date]="month3" [getCellInfo]="getDayInfo" />
						<lu-calendar2 [date]="month4" [getCellInfo]="getDayInfo" />
						<lu-calendar2 [date]="month5" [getCellInfo]="getDayInfo" />
					</div>
				</div>
			`,
		};
	},
} as Meta;

export const selectIsProgress: StoryObj<Calendar2Component> = {};
