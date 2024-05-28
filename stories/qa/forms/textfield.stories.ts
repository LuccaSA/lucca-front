import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
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

const template: StoryFn<TextfieldStory> = () => ({});

export const basic = template.bind({});
