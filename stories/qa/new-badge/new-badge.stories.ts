import { Component } from '@angular/core';
import { NewBadgeComponent } from '@lucca-front/ng/new-badge';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'new-badge-stories',
	templateUrl: './new-badge.stories.html',
	imports: [NewBadgeComponent],
})
class NewBadgeStory {}

export default {
	title: 'QA/NewBadge',
	component: NewBadgeStory,
	decorators: [
		moduleMetadata({
			entryComponents: [NewBadgeStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<NewBadgeStory> = {
	args: {},
	render: template,
};
