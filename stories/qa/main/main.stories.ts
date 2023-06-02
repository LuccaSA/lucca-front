import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'main-stories',
	templateUrl: './main.stories.html',
}) class MainStory {}

export default {
  title: 'QA/Main',
  component: MainStory,
	decorators: [
		moduleMetadata({
			entryComponents: [MainStory]
		})
	]
} as Meta;

const template: StoryFn<MainStory> = () => ({});

export const basic = template.bind({});
