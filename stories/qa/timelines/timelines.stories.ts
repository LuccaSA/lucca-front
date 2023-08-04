import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

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

const template: StoryFn<TimelinesStory> = () => ({});

export const basic = template.bind({});
