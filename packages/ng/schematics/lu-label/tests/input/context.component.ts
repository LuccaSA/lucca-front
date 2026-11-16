import { Component } from '@angular/core';

@Component({
	selector: 'app-context',
	imports: [],
	template: `
		<button luButton type="button">À traiter <span class="label palette-product">{{ toApproveByMeCount }}</span></button>
		<a class="horizontalNavigation-list-item-action" routerLink="/data">Données <span class="label palette-product">{{ count }}</span></a>
		<button luButton type="button">Ouvrir <span class="label palette-product">Nouveau</span></button>
		<table class="table">
			<tr class="table-body-row">
				<td class="table-body-row-cell"><span class="label palette-neutral mod-number">{{ message.deliveryAttempts.length }}</span></td>
				<td class="table-body-row-cell"><span class="label palette-warning">En retard</span></td>
			</tr>
		</table>
		<h1 class="pageHeader-title">Demande</h1>
		<span class="label palette-success">Validée</span>
		<h3>Contrat <span class="label palette-error">Expiré</span></h3>
	`,
})
export class ContextCasesComponent {}
