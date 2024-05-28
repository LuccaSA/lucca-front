import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'vertical-navigation-stories',
	templateUrl: './vertical-navigation.stories.html',
})
class VerticalNavigationStory {}

export default {
	title: 'QA/VerticalNavigation',
	component: VerticalNavigationStory,
	decorators: [
		moduleMetadata({
			entryComponents: [VerticalNavigationStory],
		}),
	],
} as Meta;

const template: StoryFn<VerticalNavigationStory> = () => ({});

export const basic = template.bind({});
