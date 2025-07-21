import { LOCALE_ID } from '@angular/core';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { TreeSelectDirective } from '@lucca-front/ng/core-select/tree';
import { FilterPillComponent } from '../../../../packages/ng/filter-pills/filter-pill/filter-pill.component';
import { LuCoreSelectDepartmentsDirective } from '../../../../packages/ng/core-select/department/departments.directive';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '../../../../packages/ng/form-field/form-field.component';
import { FilterBarComponent } from '../../../../packages/ng/filter-pills/filter-bar/filter-bar.component';
import { LuSimpleSelectInputComponent } from '../../../../packages/ng/simple-select/input';
import { DividerComponent } from '../../../../packages/ng/divider/divider.component';

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
	argTypes: {},
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
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree"></lu-multi-select>
</lu-form-field>
<br>
<lu-form-field label="Basic tree simple-select">
	<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Simple-select tree"></lu-simple-select>
</lu-form-field>
<br>
<lu-divider></lu-divider>
<lu-form-field label="Department multi-select">
	<lu-multi-select departments placeholder="Multi-select tree"></lu-multi-select>
</lu-form-field>
<br>
<lu-form-field label="Department simple-select">
	<lu-simple-select departments placeholder="Simple-select tree"></lu-simple-select>
</lu-form-field>
<br>
<lu-divider></lu-divider>
<lu-filter-bar>
	<lu-filter-pill label="Légumes">
		<lu-multi-select filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="allLegumes" ></lu-multi-select>
	</lu-filter-pill>
	<lu-filter-pill label="Départements">
		<lu-multi-select departments filterPillLabelPlural="départements"></lu-multi-select>
	</lu-filter-pill>
	<lu-filter-pill label="Légume">
		<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes"></lu-simple-select>
	</lu-filter-pill>
	<lu-filter-pill label="Département">
		<lu-simple-select departments></lu-simple-select>
	</lu-filter-pill>
</lu-filter-bar>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
