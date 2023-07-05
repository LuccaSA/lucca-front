import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

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

const template: Story<ProgressStory> = () => ({});

export const basic = template.bind({});
