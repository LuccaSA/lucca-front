import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<MainStory> = () => ({});

export const basic = template.bind({});
