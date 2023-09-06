import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'mobile-navigation-stories',
	templateUrl: './mobile-navigation.stories.html',
}) class MobileNavigationStory {}

export default {
  title: 'QA/MobileNavigation',
  component: MobileNavigationStory,
	decorators: [
		moduleMetadata({
			entryComponents: [MobileNavigationStory]
		})
	]
} as Meta;

const template: Story<MobileNavigationStory> = () => ({});

export const basic = template.bind({});
