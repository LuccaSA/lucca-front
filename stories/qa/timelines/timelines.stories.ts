import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'timelines-stories',
	templateUrl: './timelines.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
