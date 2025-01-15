import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { LuMultiSelectInputComponent } from '../../../../../packages/ng/multi-select/input';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

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
			template: `<lu-filter-pill label="Légume" name="legume"><lu-simple-select [(ngModel)]="example"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" /></lu-filter-pill>

<pr-story-model-display>{{example | json}}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Légume" name="legume"><lu-multi-select [(ngModel)]="examples"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" filterPillLabelPlural="légumes" /></lu-filter-pill>

<pr-story-model-display>{{examples | json}}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
