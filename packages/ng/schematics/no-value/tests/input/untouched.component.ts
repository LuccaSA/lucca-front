import { Component } from '@angular/core';

@Component({
	selector: 'app-untouched',
	template: `
		<table>
			<tr>
				<td>–</td>
			</tr>
		</table>
		<lu-data-presentation label="Manager">–</lu-data-presentation>
	`,
})
export class UntouchedComponent {}
