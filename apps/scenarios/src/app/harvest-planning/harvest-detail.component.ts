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
	templateUrl: './harvest-detail.component.html',
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
