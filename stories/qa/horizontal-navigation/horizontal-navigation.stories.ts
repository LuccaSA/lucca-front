import { Component } from '@angular/core';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<HorizontalNavigationStory> = () => ({});

export const Basic = template.bind({});
