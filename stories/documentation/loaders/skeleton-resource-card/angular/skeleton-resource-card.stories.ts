import { provideRouter } from '@angular/router';
import { SkeletonCardComponent } from '@lucca-front/ng/skeleton';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Card',
	component: SkeletonCardComponent,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

export const Template: StoryObj<SkeletonCardComponent> = {
	argTypes: {
		descriptionLines: {
			description: 'Nombre de lignes de contenu.',
			control: {
				type: 'number',
				min: 0,
			},
		},
	},

	args: {
		descriptionLines: 1,
	},
};
