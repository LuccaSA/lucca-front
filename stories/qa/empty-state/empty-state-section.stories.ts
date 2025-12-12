import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'empty-state-section-stories',
	templateUrl: './empty-state-section.stories.html',
	imports: [LuSafeExternalSvgPipe, EmptyStateSectionComponent],
})
class EmptyStateSectionStory {}

export default {
	title: 'QA/EmptyState/Section',
	component: EmptyStateSectionStory,
	decorators: [
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
} as Meta;

const template: StoryFn<EmptyStateSectionStory> = () => ({});

export const Basic = template.bind({});
