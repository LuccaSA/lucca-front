import { Component } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
	selector: 'app-translate',
	imports: [TranslateDirective],
	template: `
		<span class="label palette-neutral" translate="EXPORT_TYPE_LABEL"></span>
		<span class="label palette-success" translate>REQUEST_STATUS_APPROVED</span>
	`,
})
export class TranslateCasesComponent {}
