import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<VerticalNavigationStory> = {
	args: {},
	render: template,
};
