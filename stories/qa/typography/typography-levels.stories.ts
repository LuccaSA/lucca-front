import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'typography-levels-stories',
	templateUrl: './typography-levels.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TypographyLevelsStory {}

export default {
	title: 'QA/Typography/Levels',
	component: TypographyLevelsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TypographyLevelsStory> = {
	args: {},
	render: template,
};
