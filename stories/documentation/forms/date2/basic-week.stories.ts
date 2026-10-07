import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component, luDate2Translations } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { intlArgType } from '@/helpers/stories';

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
	argTypes: {
		dateClicked: {
			description: 'Événement déclenché lors du clic sur une date, avec la date en paramètre.',
			action: 'dateClicked',
			control: false,
			table: { category: 'outputs', type: { summary: 'Date' } },
		},
		intl: intlArgType(luDate2Translations, 'Date2Translate'),
	},
	render: (args) => {
		return {
			props: {
				...args,
				currentMonth: new Date(),
			},
			template: `<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [date]="currentMonth" mode="week" (dateClicked)="dateClicked($event)" />`,
		};
	},
} as Meta;

export const BasicWeek: StoryObj<Calendar2Component> = {};
