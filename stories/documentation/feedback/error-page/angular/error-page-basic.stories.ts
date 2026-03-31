import { provideRouter } from '@angular/router';
import { ErrorPageComponent } from '@lucca-front/ng/error-page';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ERROR_PAGE_ILLUSTRATION } from 'packages/ng/error-page/error-page.model';
import { generateInputs, setStoryOptions } from 'stories/helpers/stories';

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
			description: 'Titre de la page d’erreur.',
		},
		illustration: {
			options: setStoryOptions(ERROR_PAGE_ILLUSTRATION),
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration.',
		},
	},
} as Meta;

export const Template: StoryObj<ErrorPageComponent> = {
	args: {
		heading: 'Erreur 404',
		illustration: '404',
	},
};
