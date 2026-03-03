import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface Story {
	current: number;
	steps: number;
	critical: boolean;
	success: boolean;
	label: string;
}

export default {
	title: 'Documentation/Progress stepper/Angular/Basic',
	argTypes: {
		current: {
			control: { type: 'range', min: 1, max: 6 },
		},
		steps: {
			control: { type: 'range', min: 3, max: 6 },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ProgressStepperComponent, ProgressStepperStepComponent, RouterLink],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args: Story) => {
		const critical = args.critical ? ` state="critical"` : ``;
		const success = args.success ? ` state="success"` : ``;
		const step = `
	<lu-progress-stepper-step label="Lorem ipsum dolor" />`;
		return {
			template: cleanupTemplate(`<lu-progress-stepper current="${args.current}">
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-1/'" label="${args.label}"${critical} />
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-2/'" label="Lorem ipsum dolor"${success} />${step.repeat(args.steps - 2)}
</lu-progress-stepper>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		steps: 6,
		current: 3,
		critical: false,
		success: false,
		label: 'Lorem',
	},
};
