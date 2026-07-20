import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/Select/Angular',
	decorators: [
		applicationConfig({ providers: [provideAnimations(), provideHttpClient()] }),
		moduleMetadata({
			imports: [FilterPillComponent, LuSimpleSelectInputComponent, LuMultiSelectInputComponent, StoryModelDisplayComponent, JsonPipe, FilterLegumesPipe, LuCoreSelectUsersDirective],
			providers: [provideCoreSelectCurrentUserId(() => 66)],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examples: [],
				user: null,
				legumes: allLegumes,
			},
			template: `<lu-filter-pill label="Légume" name="legume">
			<lu-simple-select [(value)]="example"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
</lu-filter-pill>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Légume" name="legume">
	<lu-multi-select [(value)]="examples"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" filterPillLabelPlural="légumes" />
</lu-filter-pill>

<pr-story-model-display>{{ examples | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Utilisateur" name="user">
	<lu-simple-select [(value)]="user"	users enableFormerEmployees/>
</lu-filter-pill>

<pr-story-model-display>{{ user | json }}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
