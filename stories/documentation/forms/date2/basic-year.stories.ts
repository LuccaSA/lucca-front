import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

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
		nextPage: {
			description: 'Événement déclenché lors de la navigation vers la page suivante du calendrier.',
			action: 'nextPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		previousPage: {
			description: 'Événement déclenché lors de la navigation vers la page précédente du calendrier.',
			action: 'previousPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		dateClicked: {
			description: 'Événement déclenché lors du clic sur une date, avec la date en paramètre.',
			action: 'dateClicked',
			control: false,
			table: { category: 'outputs', type: { summary: 'Date' } },
		},
	},
	render: (args, { argTypes }) => {
		return {
			props: {
				...args,
				currentMonth: new Date(),
			},
			template: `<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [date]="currentMonth" mode="month" (dateClicked)="dateClicked($event)" (nextPage)="nextPage()" (previousPage)="previousPage()" />`,
		};
	},
} as Meta;

export const BasicYear: StoryObj<Calendar2Component> = {};
