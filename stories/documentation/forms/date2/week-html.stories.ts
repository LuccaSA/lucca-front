import { Meta } from '@storybook/angular';

export default {
	title: 'Documentation/Forms/Date2/Calendar/HTML',

	render: () => {
		return {
			template: `<div class="calendar">
	<div id="calendar-name" aria-live="polite" class="calendar-name">
		<button type="button" class="calendar-name-button">octobre</button>&ngsp;
		<button type="button" class="calendar-name-button">2024</button>
		<span class="pr-u-mask">Les touches directionnelles servent à parcourir les dates. </span>
	</div>
	<table role="grid" aria-labelledby="calendar-name" class="calendar-table">
		<thead class="calendar-table-head">
			<tr class="calendar-table-head-row">
				<th scope="col" class="calendar-table-head-row-cell"><span class="pr-u-mask">Numéro de semaine</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="l"></span><span class="pr-u-mask">lundi</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="m"></span><span class="pr-u-mask">mardi</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="m"></span><span class="pr-u-mask">mercredi</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="j"></span><span class="pr-u-mask">jeudi</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="v"></span><span class="pr-u-mask">vendredi</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="s"></span><span class="pr-u-mask">samedi</span></th>
				<th scope="col" class="calendar-table-head-row-cell"><span aria-hidden="true" data-content-after="d"></span><span class="pr-u-mask">dimanche</span></th>
			</tr>
		</thead>
		<tbody class="calendar-table-body">
			<tr class="calendar-table-body-row">
				<th scopr="row" class="calendar-table-body-row-cell">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						<span class="calendar-table-body-row-cell-action-week">40</span>
					</button>
				</th>
				<td class="calendar-table-body-row-cell is-overflow" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						30
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						1
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						2
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						3
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						4
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						5
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						6
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<th scopr="row" class="calendar-table-body-row-cell">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						<span class="calendar-table-body-row-cell-action-week">41</span>
					</button>
				</th>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						7
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						8
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						9
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						10
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						11
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						12
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						13
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<th scopr="row" class="calendar-table-body-row-cell is-selected is-start" aria-selected="true">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						<span class="calendar-table-body-row-cell-action-week">42</span>
					</button>
				</th>
				<td class="calendar-table-body-row-cell is-selected">
					<span class="calendar-table-body-row-cell-action">
						14
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-selected">
					<span class="calendar-table-body-row-cell-action">
						15
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-selected">
					<span class="calendar-table-body-row-cell-action">
						16
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-selected">
					<span class="calendar-table-body-row-cell-action">
						17
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-selected is-current">
					<span class="calendar-table-body-row-cell-action">
						18
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-selected is-daysOff">
					<span class="calendar-table-body-row-cell-action">
						19
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-selected is-end is-daysOff">
					<span class="calendar-table-body-row-cell-action">
						20
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<th scopr="row" class="calendar-table-body-row-cell">
					<button type="button" class="calendar-table-body-row-cell-action" tabindex="-1">
						<span class="calendar-table-body-row-cell-action-week">43</span>
					</button>
				</th>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						21
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						22
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						23
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						24
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						25 <span class="pr-u-mask">(aujourd’hui)</span>
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						26
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						27
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
			</tr>
			<tr class="calendar-table-body-row">
				<th scopr="row" class="calendar-table-body-row-cell">
					<button type="button" class="calendar-table-body-row-cell-action">
						<span class="calendar-table-body-row-cell-action-week">44</span>
					</button>
				</th>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						28
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						29
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						30
					</span>
				</td>
				<td class="calendar-table-body-row-cell" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						31
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-overflow" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						1
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff is-overflow" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						2
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
				</td>
				<td class="calendar-table-body-row-cell is-daysOff is-overflow" aria-selected="false">
					<span class="calendar-table-body-row-cell-action">
						3
						<svg class="calendar-table-body-row-cell-action-stripes"><use href="#calendar-stripes-symbol"></use></svg>
					</span>
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

export const Week = {};
