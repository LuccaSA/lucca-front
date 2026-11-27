import { Component } from '@angular/core';

@Component({
	selector: 'app-non-standalone',
	standalone: false,
	template: `
		<lu-index-table>
			<tbody luIndexTableBody>
				<tr luIndexTableRow>
					<td luIndexTableCell>–</td>
				</tr>
			</tbody>
		</lu-index-table>
	`,
})
export class NonStandaloneComponent {}
