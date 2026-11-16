import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-preserved',
	imports: [NgIf],
	template: `
		@if (count > 0) {
			<span class="label mod-number palette-neutral pr-u-marginLeft100 establishmentCounter" id="counter" [luTooltip]="tooltip">{{ count }}</span>
		}
		<label *ngIf="exportedDataCount" class="label palette-product">{{ exportedDataCount }}</label>
		<p
			class="label palette-neutral"
			data-qa="category-tag"
			aria-hidden="true"
		>
			Texte
		</p>
	`,
})
export class PreservedCasesComponent {}
