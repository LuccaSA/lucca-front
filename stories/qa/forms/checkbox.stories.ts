import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-checkbox-stories',
	templateUrl: './checkbox.stories.html'
}) class CheckboxStory {}

export default {
  title: 'QA/Forms/Checkbox',
  component: CheckboxStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxStory]
		})
	]
} as Meta;

const template: Story<CheckboxStory> = () => ({});

export const basic = template.bind({});
