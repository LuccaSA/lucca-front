import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: StoryFn<NumericBadgeStory> = () => ({});

export const basic = template.bind({});
