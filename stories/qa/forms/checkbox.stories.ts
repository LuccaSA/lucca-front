import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
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

const template: StoryFn<CheckboxStory> = () => ({});

export const basic = template.bind({});
