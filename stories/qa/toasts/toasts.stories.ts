import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'toasts-stories',
	templateUrl: './toasts.stories.html',
}) class ToastsStory {}

export default {
  title: 'QA/Toasts',
  component: ToastsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ToastsStory]
		})
	]
} as Meta;

const template: Story<ToastsStory> = () => ({});

export const all = template.bind({});
