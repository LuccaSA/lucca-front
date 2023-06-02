import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'progress-stories',
	templateUrl: './progress.stories.html',
}) class ProgressStory {}

export default {
  title: 'QA/Progress',
  component: ProgressStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ProgressStory]
		})
	]
} as Meta;

const template: StoryFn<ProgressStory> = () => ({});

export const basic = template.bind({});
