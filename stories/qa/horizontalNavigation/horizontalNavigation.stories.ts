import { Component } from '@angular/core';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'horizontalNavigation-stories',
	templateUrl: './horizontalNavigation.stories.html',
	imports: [HorizontalNavigationComponent, HorizontalNavigationLinkDirective],
})
class HorizontalNavigationStory {}

export default {
	title: 'QA/HorizontalNavigation',
	component: HorizontalNavigationStory,
} as Meta;

const template: StoryFn<HorizontalNavigationStory> = () => ({});

export const basic = template.bind({});
