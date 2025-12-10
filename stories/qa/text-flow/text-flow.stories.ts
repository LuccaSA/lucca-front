import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'text-flow-stories',
	templateUrl: './text-flow.stories.html',
})
class TextFlowStory {}

export default {
	title: 'QA/TextFlow',
	component: TextFlowStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TextFlowStory> = {
	args: {},
	render: template,
};
