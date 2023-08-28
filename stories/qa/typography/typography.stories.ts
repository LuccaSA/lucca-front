import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'typography-stories',
	templateUrl: './typography.stories.html',
})
class TypographyStory {}

export default {
	title: 'QA/Typography',
	component: TypographyStory,
} as Meta;

const template: StoryFn<TypographyStory> = () => ({});

export const basic = template.bind({});
