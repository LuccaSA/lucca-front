import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-textfield-stories',
	templateUrl: './textfield.stories.html',
})
class TextfieldStory {}

export default {
	title: 'QA/Forms/Textfield',
	component: TextfieldStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TextfieldStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TextfieldStory> = {
	args: {},
	render: template,
};
