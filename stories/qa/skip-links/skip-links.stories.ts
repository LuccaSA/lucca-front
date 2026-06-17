import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSkipLinksComponent, SkipLinksService } from '@lucca-front/ng/a11y';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skip-links-stories',
	templateUrl: './skip-links.stories.html',
	imports: [LuSkipLinksComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkipLinksStory {}

export default {
	title: 'QA/SkipLinks',
	component: SkipLinksStory,
	decorators: [
		applicationConfig({
			providers: [SkipLinksService],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SkipLinksStory> = {
	args: {},
	render: template,
};
