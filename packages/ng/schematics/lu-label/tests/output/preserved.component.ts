import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
	selector: 'app-preserved',
	imports: [NgIf, NumericBadgeComponent, TagComponent],
	template: `
		@if (count > 0) {
			<lu-numeric-badge value="{{ count }}" palette="neutral" class="pr-u-marginLeft100 establishmentCounter" id="counter" [luTooltip]="tooltip" />
		}
		<lu-tag label="{{ exportedDataCount }}" palette="product" outlined *ngIf="exportedDataCount" />
		<lu-tag label="Texte" palette="neutral" outlined
			data-qa="category-tag"
			aria-hidden="true" />
	`,
})
export class PreservedCasesComponent {}
