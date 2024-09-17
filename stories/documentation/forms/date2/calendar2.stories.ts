import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component, DayStatus } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Date2/Month',
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
				getDayInfo: (date: Date) => {
					const day = date.getDate();
					if (day === 7) {
						return {
							classes: ['is-start', 'is-selected'],
						} as DayStatus;
					}
					if (day > 7 && day < 19) {
						return {
							classes: ['is-selected'],
						};
					}
					if (day === 19) {
						return {
							classes: ['is-end', 'is-selected'],
						} as DayStatus;
					}
					return { classes: [] };
				},
			},
			template: `
				<lu-calendar2 [getDayInfo]="getDayInfo" [month]="currentMonth"></lu-calendar2>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
