import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'label-stories',
	templateUrl: './label.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class LabelStory {}

export default {
	title: 'QA/Label',
	component: LabelStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<LabelStory> = {
	args: {},
	render: template,
};
