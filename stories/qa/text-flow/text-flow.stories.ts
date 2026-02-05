import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'text-flow-stories',
	templateUrl: './text-flow.stories.html',
	imports: [TextFlowComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextFlowStory {}

export default {
	title: 'QA/TextFlow',
	component: TextFlowStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TextFlowStory> = {
	args: {},
	render: template,
};
