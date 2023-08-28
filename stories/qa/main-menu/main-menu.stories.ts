import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'main-menu-stories',
	templateUrl: './main-menu.stories.html',
})
class MainMenuStory {}

export default {
	title: 'QA/Main Menu',
	component: MainMenuStory,
} as Meta;

const template: StoryFn<MainMenuStory> = () => ({});

export const basic = template.bind({});
