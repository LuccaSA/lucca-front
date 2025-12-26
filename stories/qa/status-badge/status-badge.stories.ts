import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'status-badge-stories',
	templateUrl: './status-badge.stories.html',
	imports: [StatusBadgeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
