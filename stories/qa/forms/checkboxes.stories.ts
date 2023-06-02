import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-checkboxes-stories',
	templateUrl: './checkboxes.stories.html'
}) class CheckboxesStory {}

export default {
  title: 'QA/Forms/Checkboxes',
  component: CheckboxesStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxesStory]
		})
	]
} as Meta;

const template: StoryFn<CheckboxesStory> = () => ({});

export const basic = template.bind({});
