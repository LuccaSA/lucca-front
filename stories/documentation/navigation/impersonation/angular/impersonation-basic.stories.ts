import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
import { provideHttpClient } from '@angular/common/http';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { JsonPipe } from '@angular/common';

export default {
	title: 'Documentation/Navigation/Impersonation/Angular',
	component: ImpersonationComponent,
	decorators: [
		moduleMetadata({
			imports: [ImpersonationComponent, StoryModelDisplayComponent, JsonPipe],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)] }),
	],
	render: () => {
		return {
			template: `<lu-impersonation [(selectedUser)]="example"></lu-impersonation>

<pr-story-model-display>
	{{example | json}}
</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic = {};
