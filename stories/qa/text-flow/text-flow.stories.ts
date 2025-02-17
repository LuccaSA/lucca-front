import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<TextFlowStory> = () => ({});

export const basic = template.bind({});
