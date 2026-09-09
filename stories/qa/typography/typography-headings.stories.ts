import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'typography-headings-stories',
	templateUrl: './typography-headings.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TypographyHeadingsStory {}

export default {
	title: 'QA/Typography/Headings',
	component: TypographyHeadingsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TypographyHeadingsStory> = {
	args: {},
	render: template,
};
