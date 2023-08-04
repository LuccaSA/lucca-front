import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'menu-stories',
	templateUrl: './menu.stories.html',
})
class MenuStory {}

export default {
	title: 'QA/Menu',
	component: MenuStory,
} as Meta;

const template: StoryFn<MenuStory> = () => ({});

export const basic = template.bind({});
