import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'progress-stories',
	templateUrl: './progress.stories.html',
})
class ProgressStory {}

export default {
	title: 'QA/Progress',
	component: ProgressStory,
} as Meta;

const template: StoryFn<ProgressStory> = () => ({});

export const basic = template.bind({});
