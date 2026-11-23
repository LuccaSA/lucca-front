import { Component } from '@angular/core';

@Component({
	selector: 'app-review-cases',
	imports: [],
	template: `
		<span class="label palette-neutral" translate="no">Lucca</span>
		<span class="label palette-neutral" i18n>Archived</span>
		<span class="label palette-success" [luTooltip]="statementTooltip">Payé</span>
		<span [ngClass]="{ label: isCounter, 'palette-error': late }">{{ count }}</span>
	`,
})
export class ReviewCasesComponent {}
