import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PriorityComponent } from '@lucca-front/ng/priority';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'priority-stories',
	templateUrl: './priority.stories.html',
	imports: [PriorityComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PriorityStory {}

export default {
	title: 'QA/Priority',
	component: PriorityStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PriorityStory> = {
	args: {},
	render: template,
};
