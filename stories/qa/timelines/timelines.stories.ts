import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'timelines-stories',
	templateUrl: './timelines.stories.html',
})
class TimelinesStory {}

export default {
	title: 'QA/Timelines',
	component: TimelinesStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TimelinesStory> = {
	args: {},
	render: template,
};
