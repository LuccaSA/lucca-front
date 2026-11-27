import { Component } from '@angular/core';
import { IndexTableComponent } from '@lucca-front/ng/index-table';
import { NoValueComponent } from '@lucca-front/ng/no-value';

@Component({
	selector: 'app-inline-template',
	imports: [IndexTableComponent, NoValueComponent],
	template: `
		<lu-index-table>
			<tbody luIndexTableBody>
				<tr luIndexTableRow>
					<td luIndexTableCell><lu-no-value /></td>
					<td luIndexTableCell><lu-no-value /></td>
					<td luIndexTableCell>
						<lu-no-value />
					</td>
					<td luIndexTableCell><lu-no-value /></td>
					<td luIndexTableCell><lu-no-value /></td>
					<td luIndexTableCell><lu-no-value /></td>
					<td luIndexTableCell>
						@if (manager) {
							{{ manager }}
						} @else {
							<lu-no-value />
						}
					</td>
					<td luIndexTableCell>{{ manager ?? '–' }}</td>
					<td luIndexTableCell><button type="button" (click)="remove()">-</button></td>
					<td luIndexTableCell><span aria-hidden="true" data-content-before="–"></span><span class="pr-u-mask">Non applicable</span></td>
					<td luIndexTableCell>Paris - Lyon</td>
					<td luIndexTableCell><span class="pr-u-colorTextLight">–</span></td>
				</tr>
			</tbody>
		</lu-index-table>
		<p>–</p>
		<table>
			<tr>
				<td>–</td>
			</tr>
		</table>
	`,
})
export class InlineTemplateComponent {
	manager?: string;
}
