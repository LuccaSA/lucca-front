import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'empty-state-page-stories',
	templateUrl: './empty-state-page.stories.html',
	imports: [LuSafeExternalSvgPipe, EmptyStatePageComponent],
})
class EmptyStatePageStory {}

export default {
	title: 'QA/Empty State/Page',
	component: EmptyStatePageStory,
	decorators: [
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
} as Meta;

const template: StoryFn<EmptyStatePageStory> = () => ({});

export const Basic = template.bind({});
