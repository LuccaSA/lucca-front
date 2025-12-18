import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'plg-push-stories',
	templateUrl: './plg-push.stories.html',
})
class PLGPushStory {}

export default {
	title: 'QA/PLG Push',
	component: PLGPushStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PLGPushStory> = {
	args: {},
	render: template,
};
