import { provideRouter } from '@angular/router';
import { ErrorPageComponent } from '@lucca-front/ng/error-page';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/ErrorPage/Angular/Basic',
	component: ErrorPageComponent,
	decorators: [
		moduleMetadata({
			imports: [ErrorPageComponent],
		}),
		applicationConfig({
			providers: [provideRouter([])],
		}),
	],
	render: (args: ErrorPageComponent, context) => {
		const { ...inputs } = args;
		return {
			template: `<lu-error-page${generateInputs(inputs, context.argTypes)}>
	<p>La page que vous cherchez n’existe pas.</p>
	<p><a href="#">Revenir à la page précédente</a></p>
</lu-error-page>`,
			styles: [
				`
					:host ::ng-deep .errorPage,
					:host ::ng-deep .errorPage-section {
						block-size: 100%;
						inline-size: 100%;
					}`,
			],
		};
	},
	argTypes: {
		heading: {
			type: 'string',
		},
		illustration: {
			options: ['400', '403', '404', '429', '500', 'keyboard', 'lock', 'map'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<ErrorPageComponent> = {
	args: {
		heading: 'Erreur 404',
		illustration: '404',
	},
};
