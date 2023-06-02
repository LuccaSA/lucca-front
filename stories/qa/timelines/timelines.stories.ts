import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'timelines-stories',
	templateUrl: './timelines.stories.html',
}) class TimelinesStory {}

export default {
  title: 'QA/Timelines',
  component: TimelinesStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TimelinesStory]
		})
	]
} as Meta;

const template: StoryFn<TimelinesStory> = () => ({});

export const basic = template.bind({});
