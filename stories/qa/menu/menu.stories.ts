import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'menu-stories',
	templateUrl: './menu.stories.html',
}) class MenuStory {}

export default {
  title: 'QA/Menu',
  component: MenuStory,
	decorators: [
		moduleMetadata({
			entryComponents: [MenuStory]
		})
	]
} as Meta;

const template: StoryFn<MenuStory> = () => ({});

export const basic = template.bind({});
