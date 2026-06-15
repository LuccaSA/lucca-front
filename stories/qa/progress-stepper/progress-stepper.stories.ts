import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'progress-stepper-stories',
	templateUrl: './progress-stepper.stories.html',
	imports: [ProgressStepperComponent, ProgressStepperStepComponent, RouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProgressStepperStory {
	steps = [0, 1, 2, 3];
}

export default {
	title: 'QA/ProgressStepper',
	component: ProgressStepperStory,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ProgressStepperStory> = {
	args: {},
	render: template,
};
