import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'empty-state-section-stories',
	templateUrl: './empty-state-section.stories.html',
	imports: [LuSafeExternalSvgPipe, EmptyStateSectionComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

const template = () => ({});

export const Basic: StoryObj<EmptyStateSectionStory> = {
	args: {},
	render: template,
};
