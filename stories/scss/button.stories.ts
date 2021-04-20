import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	templateUrl: './button.stories.html',
}) class ButtonStory {}

export default {
  title: 'SCSS/Button',
  component: ButtonStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ButtonStory]
		})
	]
} as Meta;

const template: Story<ButtonStory> = (args: ButtonStory) => ({
  props: args,
});

export const basic = template.bind({});