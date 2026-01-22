import { Component } from '@angular/core';
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'vertical-navigation-stories',
	templateUrl: './vertical-navigation.stories.html',
	imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
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
