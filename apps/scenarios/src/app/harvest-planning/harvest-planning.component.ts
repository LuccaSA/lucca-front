import { DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuModal } from '@lucca-front/ng/modal';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { HarvestDeleteComponent } from './harvest-delete.component';
import { HarvestFormComponent } from './harvest-form.component';
import { Harvest, varietyNames } from './harvest-planning.data';
import { HarvestStore } from './harvest.store';

/**
 * Harvest planning of a community garden: a list of planned harvests, created and edited in a
 * dialog form, deleted after a confirmation. Each harvest links to its own page. The page is only
 * made of Lucca Front components.
 */
@Component({
	selector: 'app-harvest-planning',
	templateUrl: './harvest-planning.component.html',
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
		EmptyStateSectionComponent,
		IconComponent,
		LinkComponent,
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
	// Dialogs opened from this page get its injector, so they see the providers of its lazy route
	providers: [provideLuDialog()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestPlanningComponent {
	readonly #dialog = inject(LuDialogService);
	readonly #modal = inject(LuModal);
	readonly #store = inject(HarvestStore);

	readonly harvests = this.#store.harvests;
	readonly varietyNames = varietyNames;

	create(): void {
		this.#openForm(null).subscribe((draft) => this.#store.add(draft));
	}

	edit(harvest: Harvest): void {
		this.#openForm(harvest).subscribe((draft) => this.#store.update(harvest.id, draft));
	}

	delete(harvest: Harvest): void {
		this.#modal.open(HarvestDeleteComponent, harvest).onClose.subscribe(() => this.#store.remove(harvest.id));
	}

	#openForm(harvest: Harvest | null) {
		return this.#dialog.open({
			content: HarvestFormComponent,
			data: { harvest },
			// Prisme: a resource is created and edited in a drawer
			mode: 'drawer',
			size: 'M',
			canClose: (form) => form.confirmDismiss(),
		}).result$;
	}
}
