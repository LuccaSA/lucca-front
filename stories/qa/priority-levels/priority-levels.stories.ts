import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PriorityLevelsComponent } from '@lucca-front/ng/priority-levels';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'priority-levels-stories',
	templateUrl: './priority-levels.stories.html',
	imports: [PriorityLevelsComponent, LuTooltipTriggerDirective],
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
