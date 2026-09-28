import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { setDate } from 'date-fns';

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
				],
			},
			template: `
				<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [ranges]="ranges" [date]="currentMonth" mode="day" (dateClicked)="dateClicked($event)" (nextPage)="nextPage()" (previousPage)="previousPage()" />
			`,
		};
	},
} as Meta;

export const SelectRange: StoryObj<Calendar2Component> = {};
