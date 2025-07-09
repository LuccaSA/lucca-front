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
			template: `<lu-error-page ${generateInputs(inputs, context.argTypes)}/>`,
		};
	},
	argTypes: {
		heading: {
			type: 'string',
			description: 'PortalContent',
		},
		description: {
			type: 'string',
			description: 'PortalContent',
		},
		img: {
			options: ['400', '403', '404', '429', '500', 'keyboard', 'lock', 'map'],
			control: {
				type: 'select',
			},
		},
		imgAlt: {
			type: 'string',
			description: 'Alternative text for the image, decorative image if not provided',
		},
		link: {
			type: 'string',
			description: 'URL to navigate to when clicking the link',
		},
		linkLabel: {
			type: 'string',
			description: 'Label for the link, defaults to "Revenir à la page précédente"',
		},
	},
} as Meta;

export const Template: StoryObj<ErrorPageComponent> = {
	args: {
		heading: 'Erreur 404',
		description: 'La page que vous cherchez n’existe pas ou plus.',
		img: '404',
		link: null,
		linkLabel: 'Revenir à la page précédente',
		imgAlt: 'Erreur 404',
	},
};
