import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'main-menu-stories',
	templateUrl: './main-menu.stories.html',
}) class MainMenuStory {}

export default {
  title: 'QA/Main Menu',
  component: MainMenuStory,
	decorators: [
		moduleMetadata({
			entryComponents: [MainMenuStory]
		})
	]
} as Meta;

const template: StoryFn<MainMenuStory> = () => ({});

export const basic = template.bind({});
