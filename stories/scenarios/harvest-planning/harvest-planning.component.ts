import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuModal } from '@lucca-front/ng/modal';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { HarvestDeleteComponent } from './harvest-delete.component';
import { HarvestFormComponent } from './harvest-form.component';
import { Harvest, initialHarvests } from './harvest-planning.data';

/**
 * Harvest planning of a community garden: a list of planned harvests, created and edited in a
 * dialog form, deleted after a confirmation. The table is written with the `table` classes, as
 * most lists of consuming applications are, so its stylesheet loads the table styles itself.
 */
@Component({
	selector: 'sb-harvest-planning',
	template: `
		<lu-page-header label="Planning des récoltes" description="Récoltes prévues sur les parcelles du jardin partagé.">
			<button pageHeaderActions type="button" luButton (click)="create()">
				<lu-icon icon="plus" />
				Planifier une récolte
			</button>
		</lu-page-header>

		<main class="harvestPlanning-main">
			<table class="table">
				<caption class="pr-u-mask">
					Récoltes planifiées
				</caption>
				<thead class="table-head">
					<tr class="table-head-row">
						<th class="table-head-row-cell" scope="col">Responsable</th>
						<th class="table-head-row-cell" scope="col">Parcelle</th>
						<th class="table-head-row-cell" scope="col">Variétés</th>
						<th class="table-head-row-cell" scope="col">Période</th>
						<th class="table-head-row-cell mod-alignRight" scope="col">Quantité (kg)</th>
						<th class="table-head-row-cell mod-actions" scope="col"><span class="pr-u-mask">Actions</span></th>
					</tr>
				</thead>
				<tbody class="table-body">
					@for (harvest of harvests(); track harvest.id) {
						<tr class="table-body-row">
							<td class="table-body-row-cell">{{ harvest.gardener | luUserDisplay }}</td>
							<td class="table-body-row-cell">{{ harvest.plot.name }}</td>
							<td class="table-body-row-cell">{{ varietyNames(harvest) }}</td>
							<td class="table-body-row-cell">{{ harvest.period.start | date: 'shortDate' }} – {{ harvest.period.end | date: 'shortDate' }}</td>
							<td class="table-body-row-cell mod-alignRight">{{ harvest.quantity | number }}</td>
							<td class="table-body-row-cell mod-actions">
								<button type="button" luButton="ghost" size="S" [luDropdown]="actions" luTooltip="Actions" luTooltipOnlyForDisplay>
									<lu-icon icon="menuDots" [alt]="'Actions de la récolte ' + harvest.id" />
								</button>
								<ng-template #actions>
									<lu-dropdown-menu>
										<lu-dropdown-item>
											<button lu-dropdown-action type="button" (click)="edit(harvest)">Modifier</button>
										</lu-dropdown-item>
										<lu-dropdown-item>
											<button lu-dropdown-action type="button" critical (click)="delete(harvest)">Supprimer</button>
										</lu-dropdown-item>
									</lu-dropdown-menu>
								</ng-template>
							</td>
						</tr>
					}
				</tbody>
			</table>
		</main>
	`,
	styleUrl: './harvest-planning.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [
		DatePipe,
		DecimalPipe,
		ButtonComponent,
		IconComponent,
		PageHeaderComponent,
		LuDropdownTriggerDirective,
		DropdownMenuComponent,
		DropdownItemComponent,
		DropdownActionComponent,
		LuTooltipTriggerDirective,
		LuUserDisplayPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestPlanningComponent {
	readonly #dialog = inject(LuDialogService);
	readonly #modal = inject(LuModal);

	readonly harvests = signal<Harvest[]>(initialHarvests);

	#nextId = initialHarvests.length + 1;

	varietyNames(harvest: Harvest): string {
		return harvest.varieties.map((variety) => variety.name).join(', ');
	}

	create(): void {
		this.#openForm(null).subscribe((draft) => this.harvests.update((harvests) => [{ id: this.#nextId++, ...draft }, ...harvests]));
	}

	edit(harvest: Harvest): void {
		this.#openForm(harvest).subscribe((draft) => this.harvests.update((harvests) => harvests.map((h) => (h.id === harvest.id ? { id: harvest.id, ...draft } : h))));
	}

	delete(harvest: Harvest): void {
		this.#modal.open(HarvestDeleteComponent, harvest).onClose.subscribe(() => this.harvests.update((harvests) => harvests.filter((h) => h.id !== harvest.id)));
	}

	#openForm(harvest: Harvest | null) {
		return this.#dialog.open({
			content: HarvestFormComponent,
			data: harvest,
			size: 'M',
			canClose: (form) => form.confirmDismiss(),
		}).result$;
	}
}
