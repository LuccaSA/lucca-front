import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { LuMultiSelectInputComponent } from '../../../../../packages/ng/multi-select/input';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { TreeSelectDirective } from '../../../../../packages/ng/tree-select/tree-select.directive';
import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

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
<lu-filter-pill label="Légume" name="legume">
		<lu-simple-select ${clearableProperty}[(ngModel)]="simpleSelect" [options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
</lu-filter-pill>
<lu-filter-pill label="Légume" name="legume">
	<lu-multi-select ${clearableProperty}[(ngModel)]="multiSelect"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" filterPillLabelPlural="légumes" />
</lu-filter-pill>
<lu-filter-pill label="Département" name="department">
	<lu-simple-select ${clearableProperty}[(ngModel)]="SimpleSelectDepartements" departments />
</lu-filter-pill>
<lu-filter-pill label="Départements" name="departments">
	<lu-multi-select ${clearableProperty}[(ngModel)]="multiSelectDepartements" filterPillLabelPlural="départements" departments />
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input ${clearableProperty}[(ngModel)]="date" />
</lu-filter-pill>
<lu-filter-pill label="Période">
	<lu-date-range-input ${clearableProperty}[(ngModel)]="dateRange"/>
</lu-filter-pill>
<lu-filter-pill label="Légumes">
		<lu-multi-select filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="legumes" ></lu-multi-select>
	</lu-filter-pill>
	<lu-filter-pill label="Départements">
		<lu-multi-select departments filterPillLabelPlural="départements"></lu-multi-select>
	</lu-filter-pill>
	<lu-filter-pill label="Légume">
		<lu-simple-select [treeSelect]="groupingFn" [options]="legumes"></lu-simple-select>
	</lu-filter-pill>
	<lu-filter-pill label="Département">
		<lu-simple-select departments></lu-simple-select>
	</lu-filter-pill>
`,
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
