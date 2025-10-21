import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

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
	render: (args, { argTypes }) => {
		const clearableProperty = args['clearable'] ? '' : 'clearable="false" ';
		return {
			props: {
				simpleSelect: null,
				multiSelect: [],
				date: null,
				dateRange: null,
				legumes: allLegumes,
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
<lu-filter-pill label="With Select all" name="legume">
	<lu-multi-select ${clearableProperty}	[options]="legumes | filterLegumes:clue" [totalCount]="legumes.length" (clueChange)="clue = $event" filterPillLabelPlural="légumes" withSelectAll withSelectAllDisplayerLabel="Tous les légumés" />
</lu-filter-pill>
<lu-filter-pill label="Département" name="department">
	<lu-simple-select ${clearableProperty} departments></lu-simple-select>
</lu-filter-pill>
<lu-filter-pill label="Départements" name="departments">
	<lu-multi-select ${clearableProperty}filterPillLabelPlural="départements" departments />
</lu-filter-pill>
<lu-filter-pill label="Tree simple">
	<lu-simple-select ${clearableProperty}[treeSelect]="groupingFn" [options]="legumes"></lu-simple-select>
</lu-filter-pill>
<lu-filter-pill label="Tree multi">
	<lu-multi-select ${clearableProperty}filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="legumes" ></lu-multi-select>
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input ${clearableProperty}/>
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

export const Basic: StoryObj<FilterPillComponent & { clearable: boolean }> = {
	args: {
		clearable: true,
	},
};
