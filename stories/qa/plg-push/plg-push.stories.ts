import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<PLGPushStory> = () => ({});

export const Basic = template.bind({});
