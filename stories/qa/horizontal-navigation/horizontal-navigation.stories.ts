import { Component } from '@angular/core';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'horizontal-navigation-stories',
	templateUrl: './horizontal-navigation.stories.html',
	imports: [HorizontalNavigationComponent, HorizontalNavigationLinkDirective],
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
