import { FormsModule } from '@angular/forms';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { LuMultiSelectInputComponent } from '../../../../../packages/ng/multi-select/input';

export default {
	title: 'Documentation/Forms/FiltersPills/Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, LuSimpleSelectInputComponent, LuMultiSelectInputComponent, FormsModule, StoryModelDisplayComponent, JsonPipe, FilterLegumesPipe],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examples: [],
				legumes: allLegumes,
			},
			template: `<lu-filter-pill label="Légume"><lu-simple-select [(ngModel)]="example"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" /></lu-filter-pill>

<pr-story-model-display>{{example | json}}</pr-story-model-display>

<lu-filter-pill label="Légume"><lu-multi-select [(ngModel)]="examples"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" filterPillLabelPlural="légumes" /></lu-filter-pill>

<pr-story-model-display>{{examples | json}}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
