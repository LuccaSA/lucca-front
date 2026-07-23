import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface SavedView {
	id: number;
	name: string;
}

export default {
	title: 'Documentation/Forms/FiltersPills/FilterViewSelector/Angular',
	decorators: [
		moduleMetadata({
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
				IconComponent,
				FormsModule,
				LuMultiSelectInputComponent,
				LuSimpleSelectInputComponent,
				FilterLegumesPipe,
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideAnimations(), { provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	render: () => {
		const views: SavedView[] = [
			{ id: 1, name: 'Product manager' },
			{ id: 2, name: 'Product designer' },
			{ id: 3, name: 'Développeur' },
			{ id: 4, name: 'Customer success' },
			{ id: 5, name: 'Sales' },
		];
		return {
			props: {
				views,
				// Reference the actual array element so it matches (the selector compares views by reference).
				selectedView: views[0],
				example1: new Date(),
				examplePeriod: null,
				onRename: (view: SavedView) => console.log('rename', view),
				onDelete: (view: SavedView) => console.log('delete', view),
			},
			// The consumer decides when to swap the segmented control for the view selector (5+ views here).
			template: `<lu-filter-bar>
	<lu-filter-view-selector
		*luFilterPillAddonBefore
		[views]="views"
		[(selectedView)]="selectedView"
		(renameView)="onRename($event)"
		(deleteView)="onDelete($event)"
	/>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" optional name="startingDate">
		<lu-date-input [(ngModel)]="example1" />
	</lu-filter-pill>
	<lu-filter-pill label="Période">
		<lu-date-range-input [(ngModel)]="examplePeriod" />
	</lu-filter-pill>
	<ng-container *luFilterPillAddonAfter>
		<button type="submit" size="S" luButton="outlined">Exporter</button>
	</ng-container>
</lu-filter-bar>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterViewSelectorComponent<SavedView>> = {
	args: {},
};

/**
 * Un cas d’usage complet tel qu’un consommateur de la librairie l’intégrerait : une `lu-filter-bar`
 * complète (multi-select, simple-select, cases à cocher, dates…) pilotée par un `lu-filter-view-selector`.
 *
 * Chaque vue enregistrée porte sa propre combinaison de filtres. Sélectionner une vue applique ses
 * valeurs à la barre ; renommer ou supprimer une vue met à jour la liste en direct. Tout se passe
 * dans les interactions Storybook — il n’y a rien à documenter côté template.
 */
export const Advanced: StoryObj<FilterViewSelectorComponent<SavedView>> = {
	parameters: {
		docs: { disable: true },
	},
	render: () => {
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

		const views: (SavedView & { state: FilterState })[] = [
			{
				id: 1,
				name: 'Actifs seulement',
				state: { ...emptyState(), includeFormerEmployees: false, category: allLegumes[0] },
			},
			{
				id: 2,
				name: 'Racines & tubercules',
				state: { ...emptyState(), legumes: allLegumes.slice(0, 3) },
			},
			{
				id: 3,
				name: 'Arrivées récentes',
				state: { ...emptyState(), includeFormerEmployees: true, startingDate: new Date() },
			},
			{
				id: 4,
				name: 'Tout le catalogue',
				state: { ...emptyState(), legumes: [...allLegumes] },
			},
			{
				id: 5,
				name: 'Vue vide',
				state: emptyState(),
			},
		];

		const state = { ...views[0].state };

		const applyView = (view: (typeof views)[number] | null) => {
			Object.assign(state, view ? { ...view.state } : emptyState());
		};

		return {
			props: {
				views,
				legumes: allLegumes,
				selectedView: views[0],
				state,
				clue: '',
				onViewChange: (view: (typeof views)[number] | null) => applyView(view),
				onRename: (view: SavedView) => {
					const next = window.prompt('Renommer la vue', view.name);
					if (next) {
						const target = views.find((v) => v.id === view.id);
						if (target) {
							target.name = next;
						}
					}
				},
				onDelete: (view: SavedView) => {
					const index = views.findIndex((v) => v.id === view.id);
					if (index > -1) {
						views.splice(index, 1);
					}
				},
			},
			template: `<lu-filter-bar>
	<lu-filter-view-selector
		*luFilterPillAddonBefore
		[views]="views"
		[(selectedView)]="selectedView"
		(selectedViewChange)="onViewChange($event)"
		(renameView)="onRename($event)"
		(deleteView)="onDelete($event)"
	/>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [(ngModel)]="state.includeFormerEmployees" />
	</lu-filter-pill>
	<lu-filter-pill label="Légume (multi)" name="legumes">
		<lu-multi-select [(ngModel)]="state.legumes" [options]="legumes | filterLegumes:clue" [totalCount]="legumes.length" (clueChange)="clue = $event" filterPillLabelPlural="légumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Catégorie (simple)" optional name="category">
		<lu-simple-select [(ngModel)]="state.category" [options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
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
		};
	},
};
