import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<CheckboxesStory> = () => ({});

export const basic = template.bind({});
