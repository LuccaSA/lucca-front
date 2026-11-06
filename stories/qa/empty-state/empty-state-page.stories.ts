import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateDescriptionDirective, EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'empty-state-page-stories',
	templateUrl: './empty-state-page.stories.html',
	imports: [LuSafeExternalSvgPipe, EmptyStatePageComponent, EmptyStateDescriptionDirective, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
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

const template = () => ({});

export const Basic: StoryObj<EmptyStatePageStory> = {
	args: {},
	render: template,
};
