import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

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

const template: Story<MenuStory> = () => ({});

export const basic = template.bind({});
