import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-radio-buttons-stories',
	templateUrl: './radio-buttons.stories.html',
})
class RadioButtonsStory {}

export default {
	title: 'QA/Forms/RadioButtons',
	component: RadioButtonsStory,
} as Meta;

const template: StoryFn<RadioButtonsStory> = () => ({});

export const basic = template.bind({});
