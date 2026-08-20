import { DataPresentationComponent } from '@lucca-front/ng/form-field';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Data Presentation/Angular/Basic',
	component: DataPresentationComponent,
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Valeur affichée. [PortalContent]',
		},
		size: {
			options: [null, 'S'],
			control: { type: 'select' },
			description: 'Taille du composant.',
		},
	},
	render: (args, { argTypes }) => {
		const sizeAttr = args['size'] ? ` size="${args['size']}"` : '';

		return {
			template: `<lu-data-presentation label="${args['label']}"${sizeAttr}>Value</lu-data-presentation>`,
		};
	},
} as Meta;

export const Template: StoryObj<DataPresentationComponent> = {
	args: {
		label: 'Label',
		size: null,
	},
};
