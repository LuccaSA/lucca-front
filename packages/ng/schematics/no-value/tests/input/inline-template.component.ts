import { Component } from '@angular/core';
import { IndexTableComponent } from '@lucca-front/ng/index-table';

@Component({
	selector: 'app-inline-template',
	imports: [IndexTableComponent],
	template: `
		<lu-index-table>
			<tbody luIndexTableBody>
				<tr luIndexTableRow>
					<td luIndexTableCell>-</td>
					<td luIndexTableCell>–</td>
					<td luIndexTableCell>
						—
					</td>
					<td luIndexTableCell><span aria-hidden="true" data-content-before="–"></span></td>
					<td luIndexTableCell><span aria-hidden="true">–</span></td>
					<td luIndexTableCell><span aria-hidden="true" data-content-before="–"></span><span class="pr-u-mask">Non renseigné</span></td>
					<td luIndexTableCell>
						@if (manager) {
							{{ manager }}
						} @else {
							–
						}
					</td>
					<td luIndexTableCell>{{ manager ?? '–' }}</td>
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
