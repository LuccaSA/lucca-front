import { Component } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
	selector: 'app-translate-kept',
	imports: [TranslateDirective],
	template: `
		<span class="label palette-neutral" translate="EXPORT_TYPE_LABEL"></span>
		<p translate="EXPORT_DESCRIPTION"></p>
	`,
})
export class TranslateKeptCasesComponent {}
