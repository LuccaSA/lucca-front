import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
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
			},
			template: `<lu-calendar2 [hideToday]="false" [showOverflow]="false" [date]="currentMonth" mode="day" (dateClicked)="selected($event)"></lu-calendar2>`,
		};
	},
} as Meta;

export const optionOverflowHidden: StoryObj<Calendar2Component> = {};
