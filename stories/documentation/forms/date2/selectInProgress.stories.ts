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
				date: new Date(),
				getDayInfo: (date: Date, mode: CalendarMode) => {
					if (mode === 'day' && date.getDate() < 8) {
						return {
							classes: ['is-selectionInProgress'],
						};
					}
					if (mode === 'day' && date.getDate() === 8) {
						return {
							classes: ['is-endInProgress'],
						};
					}

					if (mode === 'day' && date.getDate() > 15 && date.getDate() < 22) {
						return {
							classes: ['is-selectionInProgress'],
						};
					}
					if (mode === 'day' && date.getDate() === 15) {
						return {
							classes: ['is-startInProgress'],
						};
					}
					if (mode === 'day' && date.getDate() === 22) {
						return {
							classes: ['is-endInProgress'],
						};
					}

					if (mode === 'day' && date.getDate() > 26) {
						return {
							classes: ['is-selectionInProgress'],
						};
					}
					if (mode === 'day' && date.getDate() === 26) {
						return {
							classes: ['is-startInProgress'],
						};
					}

					return { classes: [] };
				},
			},
			template: `
				<div class="calendarWrapper">
					<div class="calendarWrapper-content palette-watermelon">
						<lu-calendar2 [date]="date" [getCellInfo]="getDayInfo" />
					</div>
				</div>
			`,
		};
	},
} as Meta;

export const selectInProgress: StoryObj<Calendar2Component> = {};
