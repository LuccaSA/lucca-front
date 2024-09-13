import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { Calendar2Component, DayStatus } from '@lucca-front/ng/date2';

export default {
	title: 'Documentation/Forms/Date2/Calendar2',
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
				getDayInfo: (date: Date) => {
					const day = date.getDate();
					if (day === 6) {
						return {
							classes: ['range-start'],
						} as DayStatus;
					}
					if (day > 6 && day < 19) {
						return {
							classes: ['range'],
						};
					}
					if (day === 19) {
						return {
							classes: ['range-end'],
						} as DayStatus;
					}
					return { classes: [] };
				},
			},
			template: `
				<lu-calendar2 [getDayInfo]="getDayInfo"></lu-calendar2>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
