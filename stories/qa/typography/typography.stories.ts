import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'typography-stories',
	templateUrl: './typography.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TypographyStory {}

export default {
	title: 'QA/Typography',
	component: TypographyStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TypographyStory> = {
	args: {},
	render: template,
};
