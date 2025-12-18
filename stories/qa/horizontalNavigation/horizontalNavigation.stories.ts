import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'horizontalNavigation-stories',
	templateUrl: './horizontalNavigation.stories.html',
})
class HorizontalNavigationStory {}

export default {
	title: 'QA/HorizontalNavigation',
	component: HorizontalNavigationStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<HorizontalNavigationStory> = {
	args: {},
	render: template,
};
