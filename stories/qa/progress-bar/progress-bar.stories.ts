import { Component } from '@angular/core';
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'progress-bar-stories',
	templateUrl: './progress-bar.stories.html',
	imports: [ProgressBarComponent],
})
class ProgressBarStory {}

export default {
	title: 'QA/Progress-Bar',
	component: ProgressBarStory,
} as Meta;

const template: StoryFn<ProgressBarStory> = () => ({});

export const basic = template.bind({});
