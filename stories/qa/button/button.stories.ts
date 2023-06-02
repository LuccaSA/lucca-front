import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'button-stories',
	templateUrl: './button.stories.html',
}) class ButtonStory {}

export default {
  title: 'QA/Button',
  component: ButtonStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ButtonStory]
		})
	]
} as Meta;

const template: StoryFn<ButtonStory> = () => ({});

export const basic = template.bind({});
