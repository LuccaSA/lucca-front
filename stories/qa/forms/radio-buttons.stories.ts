import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-radio-buttons-stories',
	templateUrl: './radio-buttons.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RadioButtonsStory {}

export default {
	title: 'QA/Forms/RadioButtons',
	component: RadioButtonsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<RadioButtonsStory> = {
	args: {},
	render: template,
};
