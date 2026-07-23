import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import {
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	DialogHeaderComponent,
	injectDialogData,
	injectDialogRef,
	LuDialogService,
	provideLuDialog,
} from '@lucca-front/ng/dialog';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

export interface SavedView {
	id: number;
	name: string;
}

/**
 * Dialog opened when the user asks to rename a view. This is a demo: the "Modifier le nom" button
 * only closes the dialog, it does not persist anything.
 */
@Component({
	selector: 'sb-rename-view-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>Modifier le nom</lu-dialog-header>
			<lu-dialog-content>
				<lu-form-field label="Nom de la vue">
					<lu-text-input [ngModel]="view.name" />
				</lu-form-field>
			</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="button" luButton (click)="ref.close()">Modifier le nom</button>
					<button type="button" luButton="ghost" luDialogDismiss>Annuler</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, DialogDismissDirective, ButtonComponent, FormFieldComponent, TextInputComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameViewDialogComponent {
	readonly ref = injectDialogRef();
	readonly view = injectDialogData<SavedView>();
}

/**
 * Dialog opened when the user asks to delete a view. This is a demo: the "Supprimer la vue" button
 * only closes the dialog, it does not actually delete anything.
 */
@Component({
	selector: 'sb-delete-view-dialog',
	template: `
		<lu-dialog>
			<lu-dialog-header>Supprimer la vue ?</lu-dialog-header>
			<lu-dialog-content>Si vous supprimez cette vue, elle ne sera plus accessible.</lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="button" luButton (click)="ref.close()">Supprimer la vue</button>
					<button type="button" luButton="ghost" luDialogDismiss>Annuler</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, DialogDismissDirective, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteViewDialogComponent {
	readonly ref = injectDialogRef();
	readonly view = injectDialogData<SavedView>();
}

// Each saved view carries its own snapshot of the filter bar values.
interface FilterState {
	includeFormerEmployees: boolean;
	legumes: ILegume[];
	category: ILegume | null;
	startingDate: Date | null;
	period: [Date, Date] | null;
}

const emptyState = (): FilterState => ({
	includeFormerEmployees: false,
	legumes: [],
	category: null,
	startingDate: null,
	period: null,
});

/**
 * A full consumer-side integration: a complete `lu-filter-bar` driven by a `lu-filter-view-selector`.
 * Renaming or deleting a view opens a demo dialog whose actions only close the modal.
 */
@Component({
	selector: 'sb-advanced-filter-view-story',
	template: `<lu-filter-bar>
		<lu-filter-view-selector
			*luFilterPillAddonBefore
			[views]="views"
			[(selectedView)]="selectedView"
			(selectedViewChange)="applyView($event)"
			(renameView)="openRename($event)"
			(deleteView)="openDelete($event)"
		/>
		<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
			<lu-checkbox-input [(ngModel)]="state.includeFormerEmployees" />
		</lu-filter-pill>
		<lu-filter-pill label="Légume (multi)" name="legumes">
			<lu-multi-select [(ngModel)]="state.legumes" [options]="legumes | filterLegumes: clue" [totalCount]="legumes.length" (clueChange)="clue = $event" filterPillLabelPlural="légumes" />
		</lu-filter-pill>
		<lu-filter-pill label="Catégorie (simple)" optional name="category">
			<lu-simple-select [(ngModel)]="state.category" [options]="legumes | filterLegumes: clue" (clueChange)="clue = $event" />
		</lu-filter-pill>
		<lu-filter-pill label="Date de début" optional name="startingDate">
			<lu-date-input [(ngModel)]="state.startingDate" />
		</lu-filter-pill>
		<lu-filter-pill label="Période" optional name="period">
			<lu-date-range-input [(ngModel)]="state.period" />
		</lu-filter-pill>
		<ng-container *luFilterPillAddonAfter>
			<button type="submit" size="S" luButton="outlined">Exporter</button>
		</ng-container>
	</lu-filter-bar>`,
	imports: [
		FilterBarComponent,
		FilterPillComponent,
		FilterViewSelectorComponent,
		FilterPillAddonBeforeDirective,
		FilterPillAddonAfterDirective,
		CheckboxInputComponent,
		DateInputComponent,
		DateRangeInputComponent,
		ButtonComponent,
		LuMultiSelectInputComponent,
		LuSimpleSelectInputComponent,
		FilterLegumesPipe,
		FormsModule,
	],
	providers: [provideLuDialog()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFilterViewStoryComponent {
	readonly #dialog = inject(LuDialogService);

	protected readonly legumes = allLegumes;
	protected clue = '';

	protected readonly views: (SavedView & { state: FilterState })[] = [
		{ id: 1, name: 'Actifs seulement', state: { ...emptyState(), category: allLegumes[0] } },
		{ id: 2, name: 'Racines & tubercules', state: { ...emptyState(), legumes: allLegumes.slice(0, 3) } },
		{ id: 3, name: 'Arrivées récentes', state: { ...emptyState(), includeFormerEmployees: true, startingDate: new Date() } },
		{ id: 4, name: 'Tout le catalogue', state: { ...emptyState(), legumes: [...allLegumes] } },
		{ id: 5, name: 'Vue vide', state: emptyState() },
	];

	protected selectedView: (typeof this.views)[number] | null = this.views[0];
	protected state: FilterState = { ...this.views[0].state };

	protected applyView(view: (typeof this.views)[number] | null): void {
		this.state = view ? { ...view.state } : emptyState();
	}

	protected openRename(view: SavedView): void {
		this.#dialog.open({ content: RenameViewDialogComponent, data: view, size: 'S', mode: 'default' });
	}

	protected openDelete(view: SavedView): void {
		this.#dialog.open({ content: DeleteViewDialogComponent, data: view, size: 'S', mode: 'default' });
	}
}
