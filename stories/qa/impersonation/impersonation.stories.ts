import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';

import { applicationConfig, Meta } from '@storybook/angular';

@Component({
	selector: 'impersonation-stories',
	templateUrl: './impersonation.stories.html',
	imports: [ImpersonationComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ImpersonationStory {}

export default {
	title: 'QA/Impersonation',
	component: ImpersonationStory,
	decorators: [
		applicationConfig({
			providers: [provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)],
		}),
	],
} as Meta;

export const Basic = {};
