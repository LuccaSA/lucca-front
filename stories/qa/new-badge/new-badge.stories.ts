import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'new-badge-stories',
	templateUrl: './new-badge.stories.html',
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
