import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-checkbox-stories',
	templateUrl: './checkbox.stories.html',
})
class CheckboxStory {}

export default {
	title: 'QA/Forms/Checkbox',
	component: CheckboxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CheckboxStory> = {
	args: {},
	render: template,
};
