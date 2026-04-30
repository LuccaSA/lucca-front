import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

interface Story {
	current: number;
	steps: number;
	critical: boolean;
	success: boolean;
}

export default {
	title: 'Documentation/Progress stepper/Angular/Basic',
	argTypes: {
		current: {
			control: { type: 'range', min: 1, max: 6 },
			description: 'Étape courante.',
		},
		steps: {
			control: { type: 'range', min: 2, max: 6 },
			description: 'Nombre d’étapes présentées dans l’exemple.',
		},
		critical: {
			control: { type: 'boolean' },
			description: 'Affiche une étape en état critical.',
		},
		success: {
			control: { type: 'boolean' },
			description: 'Affiche une étape en état success.',
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
	<lu-progress-stepper-step label="Step" />`;
		return {
			template: `<lu-progress-stepper current="${args.current}">
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-1'" label="Step"${critical} />
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-2'" label="Step"${success} />${step.repeat(args.steps - 2)}
</lu-progress-stepper>`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		steps: 5,
		current: 3,
		critical: false,
		success: false,
	},
};
