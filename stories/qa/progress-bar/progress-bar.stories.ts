import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'progress-bar-stories',
	templateUrl: './progress-bar.stories.html',
	imports: [ProgressBarComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProgressBarStory {}

export default {
	title: 'QA/ProgressBar',
	component: ProgressBarStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ProgressBarStory> = {
	args: {},
	render: template,
};
