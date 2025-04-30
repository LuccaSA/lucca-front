import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { LuMultiSelectInputComponent } from '../../../../../packages/ng/multi-select/input';
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
				FilterLegumesPipe,
				FormFieldComponent,
				TextInputComponent,
				FilterLegumesPipe,
			],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				simpleSelect: null,
				multiSelect: [],
				date: null,
				dateRange: null,
				legumes: allLegumes,
			},

			template: `<lu-filter-pill label="Inclure les collaborateurs partis">
	<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
</lu-filter-pill>
<lu-filter-pill label="Légume" name="legume">
		<lu-simple-select [(ngModel)]="simpleSelect" [options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
</lu-filter-pill>
<lu-filter-pill label="Légume" name="legume">
	<lu-multi-select [(ngModel)]="multiSelect" [clearable]="false"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" filterPillLabelPlural="légumes" />
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input [(ngModel)]="date" />
</lu-filter-pill>
<lu-filter-pill label="Période">
	<lu-date-range-input [(ngModel)]="dateRange"/>
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

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
