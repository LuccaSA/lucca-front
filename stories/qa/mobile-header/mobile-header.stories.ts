import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'mobile-header-stories',
	templateUrl: './mobile-header.stories.html',
})
class MobileHeaderStory {}

export default {
	title: 'QA/MobileHeader',
	component: MobileHeaderStory,
	decorators: [
		moduleMetadata({
			entryComponents: [MobileHeaderStory],
		}),
	],
} as Meta;

const template: StoryFn<MobileHeaderStory> = () => ({});

export const basic = template.bind({});
