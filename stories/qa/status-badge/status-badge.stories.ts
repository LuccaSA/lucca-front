import { Component } from '@angular/core';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'status-badge-stories',
	templateUrl: './status-badge.stories.html',
	imports: [StatusBadgeComponent],
})
class StatusBadgeStory {}

export default {
	title: 'QA/StatusBadge',
	component: StatusBadgeStory,
} as Meta;

const template: StoryFn<StatusBadgeStory> = () => ({});

export const basic = template.bind({});
