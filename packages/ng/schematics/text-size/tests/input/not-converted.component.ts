import { Component } from '@angular/core';

@Component({
	selector: 'app-not-converted',
	template: `
		<strong class="pr-u-textS">Lorem ipsum</strong>
		<table class="table">
			<tr>
				<th class="pr-u-textS">Lorem ipsum</th>
				<th><span class="pr-u-textXS">Lorem ipsum</span></th>
			</tr>
		</table>
		<dl>
			<dt class="pr-u-textXS">Lorem</dt>
		</dl>
		<code class="pr-u-textXS">npm start</code>
		<h3 class="pr-u-textM">Lorem ipsum</h3>
		<div class="pr-u-fontWeight700"><span class="pr-u-textS">Lorem ipsum</span></div>
	`,
})
export class NotConvertedCasesComponent {}
