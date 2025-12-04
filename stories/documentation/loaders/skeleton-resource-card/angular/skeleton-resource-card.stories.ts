import { provideRouter } from '@angular/router';
import { SkeletonResourceCardComponent } from '@lucca-front/ng/skeleton';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Resource Card',
	component: SkeletonResourceCardComponent,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

export const Template: StoryObj<SkeletonResourceCardComponent> = {
	argTypes: {},

	args: {
		dark: false,
		descriptionLines: 0,
	},
};
