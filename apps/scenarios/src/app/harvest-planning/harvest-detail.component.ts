import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DataPresentationComponent } from '@lucca-front/ng/form-field';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { varietyNames } from './harvest-planning.data';
import { HarvestStore } from './harvest.store';

/**
 * Page of a harvest, reached from the planning. Its edit form is a routed dialog (`/harvests/:id/edit`):
 * it has its own URL, the browser history opens and closes it.
 */
@Component({
	selector: 'app-harvest-detail',
	template: `
		@if (harvest(); as harvest) {
			<lu-main-layout>
				<ng-container mainLayoutHeader>
					<lu-page-header container [label]="varietyNames(harvest)" [description]="harvest.comment || null">
						<!-- Prisme: a single level of depth takes a back button, not breadcrumbs -->
						<ng-container pageHeaderBackAction>
							<a luButton routerLink="/harvests">
								<lu-icon icon="arrowLeft" alt="Retour au planning des récoltes" />
							</a>
						</ng-container>
						<a pageHeaderActions luButton routerLink="edit">Modifier</a>
					</lu-page-header>
				</ng-container>

				<lu-main-layout-block>
					<lu-container>
						<!-- Prisme: the fields of a record read as label and value (DataPresentation), HighlightData is for key figures -->
						<lu-grid columns="4">
							<lu-grid-column>
								<lu-data-presentation label="Jardinier ou jardinière">{{ harvest.gardener | luUserDisplay }}</lu-data-presentation>
							</lu-grid-column>
							<lu-grid-column>
								<lu-data-presentation label="Parcelle">{{ harvest.plot.name }}</lu-data-presentation>
							</lu-grid-column>
							<lu-grid-column>
								<lu-data-presentation label="Période de récolte">{{ harvest.period.start | date: 'shortDate' }} – {{ harvest.period.end | date: 'shortDate' }}</lu-data-presentation>
							</lu-grid-column>
							<lu-grid-column>
								<lu-data-presentation label="Quantité estimée">{{ harvest.quantity | number }} kg</lu-data-presentation>
							</lu-grid-column>
						</lu-grid>
					</lu-container>
				</lu-main-layout-block>
			</lu-main-layout>
		}

		<!-- Outlet of the routed edit dialog -->
		<router-outlet />
	`,
	imports: [
		DatePipe,
		DecimalPipe,
		RouterLink,
		RouterOutlet,
		ButtonComponent,
		ContainerComponent,
		DataPresentationComponent,
		GridComponent,
		GridColumnComponent,
		IconComponent,
		MainLayoutComponent,
		MainLayoutBlockComponent,
		PageHeaderComponent,
		LuUserDisplayPipe,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestDetailComponent {
	readonly #store = inject(HarvestStore);

	/** Bound from the `:id` route parameter */
	readonly id = input.required({ transform: numberAttribute });

	readonly harvest = computed(() => this.#store.get(this.id()));
	readonly varietyNames = varietyNames;
}
