import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/TreeSelect',
	decorators: [
		moduleMetadata({
			imports: [
				LuMultiSelectInputComponent,
				TreeSelectDirective,
				FilterPillComponent,
				LuCoreSelectDepartmentsDirective,
				FormFieldComponent,
				FilterBarComponent,
				LuSimpleSelectInputComponent,
				DividerComponent,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()],
		}),
	],
	argTypes: {
		treeSelect: {
			description:
				'Fonction de regroupement appelée pour chaque option avec la liste de toutes les options : elle retourne l’option parente, ou `null` pour une option racine. À poser sur un `lu-simple-select` ou un `lu-multi-select`.',
			control: false,
			table: { category: 'inputs', type: { summary: 'TreeGroupingFn<T>', detail: '(value: T, array: T[]) => T | null' } },
		},
	},
	render: (args, { argTypes }) => {
		return {
			props: {
				allLegumes: allLegumes,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},
			template: `
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" clearable />
</lu-form-field><br>
`,
		};
	},
} as Meta;

export const AllImplementations: StoryObj = {
	render: (args, { argTypes }) => {
		return {
			props: {
				allLegumes: allLegumes,
				legumesPluralFn: (count: number) => `${count} légumes`,
				departmentsPluralFn: (count: number) => `${count} départements`,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},
			template: `
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" />
</lu-form-field><br>
<lu-form-field label="Basic tree simple-select">
	<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Simple-select tree" />
</lu-form-field>
<br>
<lu-divider />
<lu-form-field label="Department multi-select">
	<lu-multi-select departments placeholder="Multi-select tree" />
</lu-form-field>
<br>
<lu-form-field label="Department simple-select">
	<lu-simple-select departments placeholder="Simple-select tree" />
</lu-form-field>
<br>
<lu-divider />
<lu-filter-bar>
	<lu-filter-pill label="Légumes">
		<lu-multi-select [filterPillLabelPluralFn]="legumesPluralFn" [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements">
		<lu-multi-select departments [filterPillLabelPluralFn]="departmentsPluralFn" />
	</lu-filter-pill>
	<lu-filter-pill label="Légume">
		<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Département">
		<lu-simple-select departments />
	</lu-filter-pill>
</lu-filter-bar>
`,
		};
	},
};

export const Basic: StoryObj = {};
