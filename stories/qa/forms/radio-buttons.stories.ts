import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
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

const template: StoryFn<RadioButtonsStory> = () => ({});

export const basic = template.bind({});
