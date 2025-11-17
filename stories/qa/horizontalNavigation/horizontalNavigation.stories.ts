import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'horizontalNavigation-stories',
	templateUrl: './horizontalNavigation.stories.html',
})
class HorizontalNavigationStory {}

export default {
	title: 'QA/HorizontalNavigation',
	component: HorizontalNavigationStory,
} as Meta;

const template: StoryFn<HorizontalNavigationStory> = () => ({});

export const basic = template.bind({});
