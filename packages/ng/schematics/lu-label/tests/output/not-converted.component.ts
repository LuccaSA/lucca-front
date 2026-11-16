import { Component } from '@angular/core';

@Component({
	selector: 'app-not-converted',
	imports: [],
	template: `
		<span class="label palette-warning">Lecture seule</span>
		<div class="label mod-button palette-error" (click)="openModal()">{{ count }}</div>
		<span class="label palette-neutral" routerLink="/foo">Lien</span>
		<span class="label" [class.palette-error]="isLate" [class.palette-success]="isDone">{{ x.status }}</span>
		<label class="label" [ngClass]="campaign.status | i18nSelect: statusMapping">{{ campaign.status }}</label>
		<span class="label {{ getStateClass(licence) }}">{{ licence.state }}</span>
		<span [class.label]="hasLabel">Texte</span>
		<span class="label mod-number palette-neutral">{{ count }} éléments</span>
	`,
})
export class NotConvertedCasesComponent {}
