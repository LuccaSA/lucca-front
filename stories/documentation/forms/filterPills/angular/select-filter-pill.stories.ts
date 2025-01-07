import { FormsModule } from '@angular/forms';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { allLegumes } from '@/stories/forms/select/select.utils';

export default {
	title: 'Documentation/Forms/FiltersPills/Select/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, LuSimpleSelectInputComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				legumes: allLegumes,
			},
			template: `<lu-filter-pill label="Légume"><lu-simple-select [(ngModel)]="example" [options]="legumes" /></lu-filter-pill>

<pr-story-model-display>{{example}}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
