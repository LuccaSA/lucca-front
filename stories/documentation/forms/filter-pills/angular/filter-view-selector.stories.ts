import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { configureLuDialog } from '@lucca-front/ng/dialog';
import {
	FilterBarComponent,
	FilterPillAddonAfterDirective,
	FilterPillAddonBeforeDirective,
	FilterPillComponent,
	FilterViewSelectorComponent,
	luFilterPillsTranslations,
} from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { AdvancedFilterViewStoryComponent, SavedView } from './filter-view-selector-advanced-example.component';
import { intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/FiltersPills/FilterViewSelector/Angular',
	argTypes: {
		views: {
			description: 'Liste des vues enregistrées proposées à la sélection. Obligatoire.',
			control: false,
			table: { category: 'inputs', type: { summary: 'T[]' } },
		},
		viewLabel: {
			description: 'Fonction retournant le libellé d’une vue. Lit sa propriété <code>name</code> par défaut.',
			control: false,
			table: { category: 'inputs', type: { summary: '(view: T) => string' } },
		},
		optionComparer: {
			description: 'Fonction de comparaison de deux vues pour la sélection. Même convention que <code>lu-simple-select</code> : comparaison structurelle par défaut.',
			control: false,
			table: { category: 'inputs', type: { summary: 'LuOptionComparer<T>' } },
		},
		optionKey: {
			description: 'Identité stable d’une vue, utilisée pour le suivi du <code>@for</code>. Identité de l’objet par défaut.',
			control: false,
			table: { category: 'inputs', type: { summary: '(view: T) => unknown' } },
		},
		selectedView: {
			description: 'Vue actuellement sélectionnée. Two-way.',
			control: false,
			table: { category: 'models', type: { summary: 'T | null' }, defaultValue: { summary: 'null' } },
		},
		renameView: {
			description: 'Événement déclenché lorsque l’utilisateur demande à renommer une vue.',
			action: 'renameView',
			control: false,
			table: { category: 'outputs', type: { summary: 'T' } },
		},
		deleteView: {
			description: 'Événement déclenché lorsque l’utilisateur demande à supprimer une vue.',
			action: 'deleteView',
			control: false,
			table: { category: 'outputs', type: { summary: 'T' } },
		},
		intl: intlArgType(luFilterPillsTranslations, 'LuFilterPillsLabel'),
	},
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
	render: (args) => {
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
				renameView: (view: SavedView) => args['renameView']?.(view),
				deleteView: (view: SavedView) => args['deleteView']?.(view),
			},
			// The consumer decides when to swap the segmented control for the view selector (5+ views here).
			template: `<lu-filter-bar>
	<lu-filter-view-selector
		*luFilterPillAddonBefore
		[views]="views"
		[(selectedView)]="selectedView"
		(renameView)="renameView($event)"
		(deleteView)="deleteView($event)"
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
