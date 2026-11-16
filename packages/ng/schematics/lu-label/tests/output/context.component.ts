import { Component } from '@angular/core';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';

@Component({
	selector: 'app-context',
	imports: [NumericBadgeComponent, TagComponent, StatusBadgeComponent],
	template: `
		<button luButton type="button">À traiter <lu-numeric-badge value="{{ toApproveByMeCount }}" palette="product" /></button>
		<a class="horizontalNavigation-list-item-action" routerLink="/data">Données <lu-numeric-badge value="{{ count }}" palette="product" /></a>
		<button luButton type="button">Ouvrir <lu-tag label="Nouveau" palette="product" outlined /></button>
		<table class="table">
			<tr class="table-body-row">
				<td class="table-body-row-cell"><lu-numeric-badge value="{{ message.deliveryAttempts.length }}" palette="neutral" /></td>
				<td class="table-body-row-cell"><lu-status-badge label="En retard" palette="warning" /></td>
			</tr>
		</table>
		<h1 class="pageHeader-title">Demande</h1>
		<lu-status-badge label="Validée" size="L" palette="success" />
		<h3>Contrat <lu-status-badge label="Expiré" palette="error" /></h3>
	`,
})
export class ContextCasesComponent {}
