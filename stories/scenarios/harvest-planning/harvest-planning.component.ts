import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuModal } from '@lucca-front/ng/modal';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { HarvestDeleteComponent } from './harvest-delete.component';
import { HarvestFormComponent } from './harvest-form.component';
import { Harvest, initialHarvests } from './harvest-planning.data';

/**
 * Harvest planning of a community garden: a list of planned harvests, created and edited in a
 * dialog form, deleted after a confirmation. The page is only made of Lucca Front components.
 */
@Component({
	selector: 'sb-harvest-planning',
	template: `
		<lu-main-layout>
			<ng-container mainLayoutHeader>
				<lu-page-header container label="Planning des récoltes" description="Récoltes prévues sur les parcelles du jardin partagé.">
					<button pageHeaderActions type="button" luButton (click)="create()">
						<lu-icon icon="plus" />
						Planifier une récolte
					</button>
				</lu-page-header>
			</ng-container>

			<lu-main-layout-block>
				<lu-container>
					<lu-data-table>
						<thead luDataTableHead>
							<tr luDataTableRow>
								<th luDataTableCell>Responsable</th>
								<th luDataTableCell>Parcelle</th>
								<th luDataTableCell>Variétés</th>
								<th luDataTableCell>Période</th>
								<th luDataTableCell align="end">Quantité (kg)</th>
								<th luDataTableCell>Actions</th>
							</tr>
						</thead>
						<tbody luDataTableBody>
							@for (harvest of harvests(); track harvest.id) {
								<tr luDataTableRow>
									<td luDataTableCell>{{ harvest.gardener | luUserDisplay }}</td>
									<td luDataTableCell>{{ harvest.plot.name }}</td>
									<td luDataTableCell>{{ varietyNames(harvest) }}</td>
									<td luDataTableCell>{{ harvest.period.start | date: 'shortDate' }} – {{ harvest.period.end | date: 'shortDate' }}</td>
									<td luDataTableCell align="end">{{ harvest.quantity | number }}</td>
									<td luDataTableCell actions>
										<button type="button" luButton [luDropdown]="actions" luTooltip="Actions" luTooltipOnlyForDisplay>
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
					</lu-data-table>
				</lu-container>
			</lu-main-layout-block>
		</lu-main-layout>
	`,
	imports: [
		DatePipe,
		DecimalPipe,
		ButtonComponent,
		ContainerComponent,
		DataTableComponent,
		DataTableHeadComponent,
		DataTableBodyComponent,
		DataTableRowComponent,
		DataTableRowCellHeaderComponent,
		DataTableRowCellComponent,
		IconComponent,
		MainLayoutComponent,
		MainLayoutBlockComponent,
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
