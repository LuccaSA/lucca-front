import { DataPresentationComponent } from '@lucca-front/ng/form-field';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Forms/Data Presentation/Angular/Basic',
	component: DataPresentationComponent,
	argTypes: {
		label: {
			control: { type: 'text' },
			description: 'Libellé de la donnée (terme). La valeur correspond au contenu projeté. [PortalContent]',
			table: { category: 'inputs' },
		},
		size: {
			options: [null, 'S'],
			control: { type: 'select' },
			description: 'Taille du composant.',
			table: { category: 'inputs' },
		},
		noValue: {
			description: 'Affiche un tiret lorsqu’aucune valeur n’est renseignée.',
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => {
		const sizeAttr = args['size'] ? ` size="${args['size']}"` : '';
		const noValueAttr = args['noValue'] ? ` noValue` : '';
		const content = args['noValue'] ? '' : 'Value';

		return {
			template: `<lu-data-presentation label="${args['label']}"${sizeAttr}${noValueAttr}>${content}</lu-data-presentation>`,
		};
	},
} as Meta;

export const Template: StoryObj<DataPresentationComponent> = {
	args: {
		label: 'Label',
		size: null,
		noValue: false,
	},
};
