import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'status-badge-stories',
	templateUrl: './status-badge.stories.html',
})
class StatusBadgeStory {}

export default {
	title: 'QA/StatusBadge',
	component: StatusBadgeStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<StatusBadgeStory> = {
	args: {},
	render: template,
};
