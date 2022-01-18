import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'forms-radio-buttons-stories',
	templateUrl: './radio-buttons.stories.html'
}) class RadioButtonsStory {}

export default {
  title: 'QA/Forms/RadioButtons',
  component: RadioButtonsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadioButtonsStory]
		})
	]
} as Meta;

const template: Story<RadioButtonsStory> = () => ({});

export const basic = template.bind({});
