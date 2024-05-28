import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'form-label-stories',
	templateUrl: './form-label.stories.html',
})
class FormLabelStory {}

export default {
	title: 'QA/Form Label',
	component: FormLabelStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FormLabelStory],
		}),
	],
} as Meta;

const template: StoryFn<FormLabelStory> = () => ({});

export const basic = template.bind({});
