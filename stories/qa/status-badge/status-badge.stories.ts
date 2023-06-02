import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'status-badge-stories',
	templateUrl: './status-badge.stories.html',
}) class StatusBadgeStory {}

export default {
  title: 'QA/StatusBadge',
  component: StatusBadgeStory,
	decorators: [
		moduleMetadata({
			entryComponents: [StatusBadgeStory]
		})
	]
} as Meta;

const template: StoryFn<StatusBadgeStory> = () => ({});

export const basic = template.bind({});
