import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

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

const template: Story<ButtonStory> = () => ({});

export const basic = template.bind({});
