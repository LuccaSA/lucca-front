import { provideRouter, RouterLink } from '@angular/router';
import { PROGRESS_STEPPER_STEP_STATE, ProgressStepperComponent, ProgressStepperStepComponent, ProgressStepperStepState } from '@lucca-front/ng/progress-stepper';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';

interface Story {
	current: number;
	steps: number;
	label: string;
	state: ProgressStepperStepState | null;
}

export default {
	title: 'Documentation/Listings/Progress stepper/Angular/Basic',
	component: ProgressStepperComponent,
	argTypes: {
		current: {
			control: { type: 'range', min: 1, max: 6 },
			description: 'Étape courante.',
			table: { category: 'inputs', defaultValue: { summary: '1' } },
		},
		steps: {
			control: { type: 'range', min: 2, max: 6 },
			description: 'Nombre d’étapes présentées dans l’exemple.',
			table: { category: 'story' },
		},
		label: {
			control: { type: 'text' },
			description: 'Libellé de l’étape (obligatoire).',
			table: { category: 'inputs (progress-stepper-step)' },
		},
		state: {
			options: setStoryOptions(PROGRESS_STEPPER_STEP_STATE),
			control: { type: 'select' },
			description: 'État de l’étape. Appliqué à la première étape dans l’exemple.',
			table: { category: 'inputs (progress-stepper-step)', defaultValue: { summary: 'null' } },
		},
		routerLinkParam: {
			control: false,
			description: 'Lien de navigation de l’étape : `RouterLinkParam` ou toute valeur acceptée par `routerLink`. Voir la story Route.',
			table: {
				category: 'inputs (progress-stepper-step)',
				type: { summary: 'RouterLinkParam | string | readonly string[] | UrlTree' },
				defaultValue: { summary: 'null' },
			},
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
		const state = args.state ? ` state="${args.state}"` : ``;
		const step = `
	<lu-progress-stepper-step label="${args.label}" />`;
		return {
			template: `<lu-progress-stepper current="${args.current}">
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-1'" label="${args.label}"${state} />
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-2'" label="${args.label}" />${step.repeat(args.steps - 2)}
</lu-progress-stepper>`,
		};
	},
} as Meta<Story>;

export const Basic = {
	args: {
		steps: 5,
		current: 3,
		label: 'Step',
		state: null,
	},
};
