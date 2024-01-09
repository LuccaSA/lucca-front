import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-page-stories',
	styleUrls: ['empty-state-page.stories.scss'],
	templateUrl: './empty-state-page.stories.html',
	imports: [LuSafeExternalSvgPipe],
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

export const basic = template.bind({});
