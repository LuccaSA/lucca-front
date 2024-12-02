import { Meta } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Date2/Calendar/HTML',

	render: () => {
		return {
			template: `<div class="calendar">
	<div id="calendar-name" aria-live="polite" class="calendar-name">
		<button type="button" class="calendar-name-button">octobre</button>&ngsp;
		<button type="button" class="calendar-name-button">2024</button>
		<span class="u-mask">Les touches directionnelles servent à parcourir les dates. </span>
	</div>
	<table role="grid" aria-labelledby="calendar-name" class="calendar-table">
		<thead class="calendar-table-head">
			<tr class="calendar-table-head-row">
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="l"><span class="u-mask">lundi</span></th>
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="m"><span class="u-mask">mardi</span></th>
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="m"><span class="u-mask">mercredi</span></th>
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="j"><span class="u-mask">jeudi</span></th>
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="v"><span class="u-mask">vendredi</span></th>
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="s"><span class="u-mask">samedi</span></th>
				<th scope="col" class="calendar-table-head-row-cell" data-content-after="d"><span class="u-mask">dimanche</span></th>
			</tr>
		</thead>
		<tbody class="calendar-table-body">
			<tr class="calendar-table-body-row">
				<td class="calendar-table-body-row-cell is-overflow" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						30
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						1
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						2
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						3
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						4
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						5
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						6
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						7
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						8
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						9
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						10
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						11
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						12
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						13
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						14
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						15
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						16
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						17
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						18
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						19
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						20
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						21
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						22
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						23
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						24
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-current" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="0">
						25 <span class="u-mask">(aujourd’hui)</span>
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						26
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						27
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						28
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						29
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						30
					</button>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						31
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-overflow" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						1
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff is-overflow" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						2
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff is-overflow" aria-selected="false">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						3
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
	<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true" class="calendar-stripes">
		<symbol id="calendar-stripes-symbol" viewBox="0 0 60 60">
			<path
				d="m-41.82 43.03 84.85-84.85.53.53-84.85 84.85zm2.12 2.12L45.15-39.7l.53.53-84.85 84.85zm2.12 2.12
			84.85-84.85.53.53-84.85 84.85zm2.12 2.13L49.4-35.47l.53.53-84.85 84.85zm2.12 2.11
			84.85-84.85.54.53-84.86 84.86zm2.12 2.13 84.86-84.86.53.53-84.86 84.86zm2.12
			2.12L55.76-29.1l.53.53-84.86 84.86zm2.13 2.12 84.85-84.85.53.53-84.85 84.85zm2.12
			2.12L60-24.85l.53.53-84.85 84.85zm2.12 2.12 84.85-84.85.53.53-84.85 84.85zm2.12
			2.12L64.24-20.6l.53.53-84.85 84.85zm2.12 2.12 84.85-84.85.53.53-84.85 84.85zm2.12
			2.13L68.5-16.37l.53.53-84.86 84.86zm2.12 2.11 84.86-84.85.53.53-84.86 84.86zm2.13 2.13
			84.85-84.85.53.53-84.85 84.85zm2.12 2.12L74.85-10l.53.53-84.85 84.85zm2.12
			2.12L76.97-7.88l.53.53L-7.35 77.5zm2.12 2.13L79.09-5.77l.53.53-84.85 84.85zm2.12
			2.11L81.21-3.64l.53.53L-3.1 81.74zm2.12 2.12L83.33-1.52l.53.53L-.99
			83.86zM.6 85.46 85.46.6l.53.53L1.13 86zm2.12 2.12L87.58 2.72l.53.53L3.25 88.11zm2.13 2.12L89.7
			4.85l.53.53L5.38 90.23zm2.12 2.12L91.82 6.97l.53.53L7.5 92.35zm2.12 2.12L93.94 9.1l.53.53L9.62
			94.47zm2.12 2.12 84.85-84.85.53.53-84.85 84.85zm2.12 2.12 84.85-84.85.53.53-84.85 84.85zm2.12
			2.12 84.86-84.85.53.53-84.86 84.86z"
				class="calendar-stripes-symbol-path"
			></path>
		</symbol></svg>
</div>`,
		};
	},
} as Meta;

export const Basic = {};
