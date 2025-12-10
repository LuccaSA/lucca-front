import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'callout-stories',
	templateUrl: './callout.stories.html',
})
class CalloutStory {}

export default {
	title: 'QA/Callout',
	component: CalloutStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CalloutStory> = {
	args: {},
	render: template,
};
