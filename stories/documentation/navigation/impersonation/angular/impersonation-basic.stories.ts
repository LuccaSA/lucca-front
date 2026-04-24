import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

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
			template: `<lu-impersonation [(selectedUser)]="example" />

<pr-story-model-display>{{example | json}}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic = {};
