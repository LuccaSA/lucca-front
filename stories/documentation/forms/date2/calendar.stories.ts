import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setDate } from 'date-fns';
import { DateRange } from 'packages/ng/date2/calendar2/date-range';

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
			styles: [`:host { display: flex; gap: 1rem; align-items: flex-start }`],
			template: `
				<lu-calendar2 [ranges]="ranges" [getDayInfo]="getDayInfo" [month]="currentMonth"></lu-calendar2>
				<div class="calendar">
					<div class="calendar-name" id="calendar-name">
						<button type="button" class="calendar-name-button">2024</button>
					</div>
					<table class="calendar-table" role="grid" aria-labeledby="calendar-name">
						<tbody class="calendar-table-body">
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Janv." tabindex="-1">
										<span class="u-mask">Janvier</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Févr." tabindex="-1">
										<span class="u-mask">Février</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Mars" tabindex="-1">
										<span class="u-mask">Mars</span>
									</button>
								</td>
							</tr>
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Avril" tabindex="-1">
										<span class="u-mask">Avril</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Mai" tabindex="-1">
										<span class="u-mask">Mai</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Juin" tabindex="-1">
										<span class="u-mask">Juin</span>
									</button>
								</td>
							</tr>
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Juil." tabindex="-1">
										<span class="u-mask">Juillet</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Août" tabindex="-1">
										<span class="u-mask">Août</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell is-current">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Sept.">
										<span class="u-mask">Septembre</span>
									</button>
								</td>
							</tr>
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Oct." tabindex="-1">
										<span class="u-mask">Octobre</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Nov." tabindex="-1">
										<span class="u-mask">Novembre</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="Déc." tabindex="-1">
										<span class="u-mask">Décembre</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="calendar">
					<div class="calendar-name" id="calendar-name">
						2020 – 2029
					</div>
					<table class="calendar-table" role="grid" aria-labeledby="calendar-name">
						<tbody class="calendar-table-body">
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell is-overflow">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2019" tabindex="-1">
										<span class="u-mask">2019</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2020" tabindex="-1">
										<span class="u-mask">2020</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2021" tabindex="-1">
										<span class="u-mask">2021</span>
									</button>
								</td>
							</tr>
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2022" tabindex="-1">
										<span class="u-mask">2022</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2023" tabindex="-1">
										<span class="u-mask">2023</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell is-current">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2024">
										<span class="u-mask">2024</span>
									</button>
								</td>
							</tr>
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2025" tabindex="-1">
										<span class="u-mask">2025</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2026" tabindex="-1">
										<span class="u-mask">2026</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2027" tabindex="-1">
										<span class="u-mask">2027</span>
									</button>
								</td>
							</tr>
							<tr class="calendar-table-body-row">
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2028" tabindex="-1">
										<span class="u-mask">2028</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2029" tabindex="-1">
										<span class="u-mask">2029</span>
									</button>
								</td>
								<td class="calendar-table-body-row-cell is-overflow">
									<button class="calendar-table-body-row-cell-action" type="button" data-content-after="2030" tabindex="-1">
										<span class="u-mask">2030</span>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
