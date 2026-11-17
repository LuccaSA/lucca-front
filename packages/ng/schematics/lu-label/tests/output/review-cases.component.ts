import { Component } from '@angular/core';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
	selector: 'app-review-cases',
	imports: [TagComponent],
	template: `
		<lu-tag label="Lucca" palette="neutral" outlined translate="no" />
		<span class="tag mod-outlined palette-neutral" i18n>Archived</span>
		<span class="label palette-success" [luTooltip]="statementTooltip">Payé</span>
		<span [ngClass]="{ label: isCounter, 'palette-error': late }">{{ count }}</span>
	`,
})
export class ReviewCasesComponent {}
