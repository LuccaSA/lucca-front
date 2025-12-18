import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'numeric-badge-stories',
	templateUrl: './numeric-badge.stories.html',
	styles: ['.numericBadge::after { animation-play-state: paused; }'],
})
class NumericBadgeStory {}

export default {
	title: 'QA/NumericBadge',
	component: NumericBadgeStory,
	decorators: [
		moduleMetadata({
			entryComponents: [NumericBadgeStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<NumericBadgeStory> = {
	args: {},
	render: template,
};
