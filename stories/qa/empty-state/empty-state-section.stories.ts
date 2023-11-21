import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-section-stories',
	templateUrl: './empty-state-section.stories.html',
	imports: [LuSafeExternalSvgPipe],
})
class EmptyStateSectionStory {}

export default {
	title: 'QA/Empty State/Section',
	component: EmptyStateSectionStory,
	decorators: [
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
} as Meta;

const template: StoryFn<EmptyStateSectionStory> = () => ({});

export const basic = template.bind({});
