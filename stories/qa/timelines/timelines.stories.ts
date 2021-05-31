import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<TimelinesStory> = () => ({});

export const all = template.bind({});
