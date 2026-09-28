import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PriorityLevelsComponent } from '@lucca-front/ng/priority-levels';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'priority-levels-stories',
	templateUrl: './priority-levels.stories.html',
	imports: [PriorityLevelsComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PriorityLevelsStory {}

export default {
	title: 'QA/PriorityLevels',
	component: PriorityLevelsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PriorityLevelsStory> = {
	args: {},
	render: template,
};
