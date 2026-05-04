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
class ImpersonationStory {
	me = { id: 66, picture: null, department: { id: 3, name: 'Commercial' }, firstName: 'Pierre', lastName: 'Durand' };
	chloe = { id: 1, picture: null, department: { id: 1, name: 'Direction' }, firstName: 'Chloe', lastName: 'Alibert', additionalInformation: 'Direction' };
}

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
