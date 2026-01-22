import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-radio-stories',
	templateUrl: './radio.stories.html',
})
class RadioStory {}

export default {
	title: 'QA/Forms/Radio',
	component: RadioStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadioStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<RadioStory> = {
	args: {},
	render: template,
};
