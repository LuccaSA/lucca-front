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
	argTypes: {
		nextPage: {
			description: 'Événement déclenché lors de la navigation vers la page suivante du calendrier.',
		},
		previousPage: {
			description: 'Événement déclenché lors de la navigation vers la page précédente du calendrier.',
		},
		dateClicked: {
			description: 'Événement déclenché lors du clic sur une date, avec la date en paramètre.',
		},
	},
	render: (args, { argTypes }) => {
		return {
			props: {
				currentMonth: new Date(),
			},
			template: `<lu-calendar2 [hideToday]="false" [showOverflow]="true" [enableOverflow]="true" [date]="currentMonth" mode="day" (dateClicked)="selected($event)" />`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
