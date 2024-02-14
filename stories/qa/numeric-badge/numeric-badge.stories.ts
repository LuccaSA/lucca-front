import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'numeric-badge-stories',
	templateUrl: './numeric-badge.stories.html',
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
