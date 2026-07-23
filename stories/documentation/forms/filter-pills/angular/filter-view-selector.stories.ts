import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { configureLuDialog } from '@lucca-front/ng/dialog';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { AdvancedFilterViewStoryComponent, SavedView } from './filter-view-selector-advanced-example.component';

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
				AdvancedFilterViewStoryComponent,
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideAnimations(), configureLuDialog(), { provide: LOCALE_ID, useValue: 'fr-FR' }] }),
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
 * valeurs à la barre ; renommer ou supprimer une vue ouvre une dialog d’exemple. Tout se passe dans
 * les interactions Storybook — il n’y a rien à documenter côté template.
 *
 * Le code de ce cas d’usage se trouve dans `filter-view-selector-advanced-example.component.ts`.
 */
export const Advanced: StoryObj<FilterViewSelectorComponent<SavedView>> = {
	parameters: {
		docs: { disable: true },
	},
	render: () => ({
		template: `<sb-advanced-filter-view-story />`,
	}),
};
