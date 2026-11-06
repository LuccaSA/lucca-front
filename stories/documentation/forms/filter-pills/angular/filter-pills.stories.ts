import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent, luFilterPillsTranslations } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/FiltersPills/FilterPills/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillComponent,
				CheckboxInputComponent,
				FormsModule,
				DateRangeInputComponent,
				DateInputComponent,
				StoryModelDisplayComponent,
				LuSimpleSelectInputComponent,
				LuMultiSelectInputComponent,
				LuCoreSelectDepartmentsDirective,
				FilterLegumesPipe,
				FormFieldComponent,
				TextInputComponent,
				FilterLegumesPipe,
				TreeSelectDirective,
				LuMultiSelectWithSelectAllDirective,
				LuCoreSelectTotalCountDirective,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()],
		}),
	],
	argTypes: {
		label: {
			description: 'Modifie le label du filtre.',
			table: { category: 'inputs' },
		},
		placeholder: {
			description: 'Remplace le texte affiché lorsque le filtre est vide.',
			table: { category: 'inputs' },
		},
		icon: {
			description: 'Remplace l’icône affichée à droite du filtre.',
			table: { category: 'inputs' },
		},
		clearable: {
			description: 'Affiche une croix pour réinitialiser le filtre si celui-ci est renseigné.',
			table: { category: 'inputs (select, date)' },
		},
		filterPillLabelPlural: {
			description:
				'[Story] Dans le cas d’un multi select, le label affiché lorsque plusieurs éléments sont sélectionnés est fourni par l’input `filterPillLabelPluralFn`, une fonction recevant le nombre d’éléments sélectionnés. Ce contrôle alimente le nom utilisé par cette fonction.',
			table: { category: 'story' },
		},
		disabled: {
			description: 'Désactive le filtre « Légume (multi) », renseigné avec une valeur : un filtre désactivé ne peut pas être vidé.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs (multi-select)' },
		},
		intl: intlArgType(luFilterPillsTranslations, 'LuFilterPillsLabel'),
	},
	render: (args, { argTypes }) => {
		const clearableProperty = args['clearable'] ? '' : 'clearable="false" ';
		const disabledPill = args['disabled'] ? 'disabled' : '';
		const label = args['label'];
		const filterPillLabelPlural = args['filterPillLabelPlural'];
		const placeholder = args['placeholder'] ? ` placeholder="${args['placeholder']}"` : '';
		const icon = args['icon'] ? ` icon="${args['icon']}"` : '';
		return {
			props: {
				simpleSelect: null,
				multiSelect: [],
				disabledLegumes: [allLegumes[0]],
				date: null,
				dateRange: null,
				legumes: allLegumes,
				legumesPluralFn: (count: number) => `${count} ${filterPillLabelPlural}`,
				treeLegumesPluralFn: (count: number) => `${count} légumes`,
				departmentsPluralFn: (count: number) => `${count} départements`,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},

			template: `<lu-filter-pill label="Inclure les collaborateurs partis">
	<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
</lu-filter-pill>
<lu-filter-pill label="${label} (multi)" name="legume"${placeholder}${icon}>
	<lu-multi-select [ngModel]="${args['disabled'] ? 'disabledLegumes' : '[]'}" ${clearableProperty}[options]="legumes | filterLegumes:clue" [totalCount]="legumes.length" (clueChange)="clue = $event" [filterPillLabelPluralFn]="legumesPluralFn" ${disabledPill} />
</lu-filter-pill>
<lu-filter-pill label="Legume (simple)" name="department">
	<lu-simple-select [ngModel]="null" ${clearableProperty}[options]="legumes | filterLegumes:clue" />
</lu-filter-pill>
<lu-filter-pill label="Départements" name="departments">
	<lu-multi-select [ngModel]="[]" ${clearableProperty}[filterPillLabelPluralFn]="departmentsPluralFn" departments />
</lu-filter-pill>
<lu-filter-pill label="Tree (simple)">
	<lu-simple-select [ngModel]="null" ${clearableProperty}[treeSelect]="groupingFn" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Tree (multi)">
	<lu-multi-select [ngModel]="[]" ${clearableProperty}[filterPillLabelPluralFn]="treeLegumesPluralFn" [treeSelect]="groupingFn" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input [ngModel]="null" ${clearableProperty}/>
</lu-filter-pill>
<lu-filter-pill label="Période">
	<lu-date-range-input ${clearableProperty}[(ngModel)]="dateRange" />
</lu-filter-pill>`,
			styles: [
				`
	:host {
		display: flex;
		flex-wrap: wrap;
		gap: var(--pr-t-spacings-100);
	}`,
			],
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent & { clearable: boolean; filterPillLabelPlural: string }> = {
	args: {
		clearable: true,
		label: 'Légume',
		filterPillLabelPlural: 'légumes',
	},
};
