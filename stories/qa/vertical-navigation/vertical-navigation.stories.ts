import { Component } from '@angular/core';
import { VerticalNavigationComponent, VerticalNavigationItemComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'vertical-navigation-stories',
	templateUrl: './vertical-navigation.stories.html',
	imports: [VerticalNavigationComponent, VerticalNavigationItemComponent],
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
