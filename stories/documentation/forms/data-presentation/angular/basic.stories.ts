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
	},
	render: (args, { argTypes }) => {
		return {
			template: `<lu-data-presentation label="${args['label']}">Value</lu-data-presentation>`,
		};
	},
} as Meta;

export const Template: StoryObj<DataPresentationComponent> = {
	args: {
		label: 'Label',
	},
};
