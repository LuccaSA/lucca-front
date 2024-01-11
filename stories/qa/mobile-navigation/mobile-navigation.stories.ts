import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'mobile-navigation-stories',
	templateUrl: './mobile-navigation.stories.html',
})
class MobileNavigationStory {}

export default {
	title: 'QA/MobileNavigation',
	component: MobileNavigationStory,
	decorators: [
		moduleMetadata({
			entryComponents: [MobileNavigationStory],
		}),
	],
} as Meta;

const template: StoryFn<MobileNavigationStory> = () => ({});

export const basic = template.bind({});
