import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
import { Meta, StoryObj } from '@storybook/angular';

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
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SkipLinksStory> = {
	args: {},
	render: template,
};
