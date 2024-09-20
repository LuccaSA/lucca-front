import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setDate } from 'date-fns';
import { DateRange } from 'packages/ng/date2/calendar2/date-range';

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

					// if (day === 7) {
					// 	return {
					// 		classes: ['toto'],
					// 	} as DayStatus;
					// }

					return { classes: [] };
				},
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
				] as DateRange[],
			},
			template: `
				<div class="monthCalendarWrapper">
					<div class="monthCalendarWrapper-navigation mod-prev">
						<button class="monthCalendarWrapper-navigation-button button" type="button">
							<span aria-hidden="true" class="lucca-icon icon-chevronLeft"></span><span class="u-mask">Mois précédent</span>
						</button>
					</div>
					<div class="monthCalendarWrapper-content" tabindex="-1">
						<lu-calendar2 [ranges]="ranges" [getDayInfo]="getDayInfo" [month]="currentMonth"></lu-calendar2>
					</div>
					<div class="monthCalendarWrapper-navigation mod-next">
						<button class="monthCalendarWrapper-navigation-button button" type="button">
							<span aria-hidden="true" class="lucca-icon icon-chevronRight"></span><span class="u-mask">Mois Suivant</span>
						</button>
					</div>
				</div>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
