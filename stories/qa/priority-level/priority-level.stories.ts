import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PriorityLevelComponent } from '@lucca-front/ng/priority-level';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'priority-level-stories',
	templateUrl: './priority-level.stories.html',
	imports: [PriorityLevelComponent, LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PriorityLevelStory {}

export default {
	title: 'QA/PriorityLevel',
	component: PriorityLevelStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PriorityLevelStory> = {
	args: {},
	render: template,
};
