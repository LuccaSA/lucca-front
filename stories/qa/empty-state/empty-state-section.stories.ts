import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateDescriptionDirective, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { CDN_URL } from '@lucca-front/ng/core';

@Component({
	selector: 'empty-state-section-stories',
	templateUrl: './empty-state-section.stories.html',
	imports: [LuSafeExternalSvgPipe, EmptyStateSectionComponent, EmptyStateDescriptionDirective, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyStateSectionStory {
	protected readonly cdnUrl = CDN_URL;
}

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
