import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Progress stepper/Angular/Route',
	argTypes: {
		routerLinkParam: { control: { type: 'object' } },
	},
	decorators: [
		moduleMetadata({
			imports: [ProgressStepperComponent, ProgressStepperStepComponent, RouterLink],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: () => {
		return {
			template: cleanupTemplate(`<lu-progress-stepper current="2" steps="3">
	<lu-progress-stepper-step [routerLinkParam]="{ commands: '/route/step-1', fragment: 'home' }" label="Home page" />
	<lu-progress-stepper-step [routerLinkParam]="{ commands: ['route', 'step', '2'], fragment: 'config' }" label="Config page" />
	<lu-progress-stepper-step [routerLinkParam]="{ commands: '/route/step-3', fragment: 'edit' }" label="Edit page" />
</lu-progress-stepper>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		routerLinkParam: {
			commands: '/route/step-1',
			relativeTo: { outlet: 'outlet' },
			fragment: 'home',
			queryParams: { debug: true },
			target: 'target',
			preserveFragment: true,
			skipLocationChange: false,
			replaceUrl: 'replace/url',
		},
	},
};
