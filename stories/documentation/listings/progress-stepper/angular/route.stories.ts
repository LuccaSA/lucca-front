import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

export default {
	title: 'Documentation/Listings/Progress stepper/Angular/Route',
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
			template: cleanupTemplate(`<lu-progress-stepper current="2">
	<lu-progress-stepper-step [routerLinkParam]="{ commands: '/route/step-1', fragment: 'home' }" label="Home page" />
	<lu-progress-stepper-step [routerLinkParam]="{ commands: ['route', 'step', '2'], fragment: 'config' }" label="Config page" />
	<lu-progress-stepper-step [routerLinkParam]="{ commands: '/route/step-3', fragment: 'edit' }" label="Edit page" />
</lu-progress-stepper>`),
		};
	},
} as Meta;

export const Basic = {};
